import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API_ERROR_UNAUTHORIZED } from './api-error-message';
import type { BaseEntity } from './base-entity';
import type { BaseResource, BaseResponse } from './base-resource';
import type { BaseAssembler } from './base-assembler';

/** Error HTTP con mapa opcional campo → mensaje (validación Spring con {@code field}/{@code message}). */
export type ApiError = Error & { fieldErrors?: Record<string, string> };

/**
 * CRUD HTTP genérico por bounded context (equivalente a MediTrack {@code BaseApiEndpoint}).
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>,
> {
  protected readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(
    protected readonly http: HttpClient,
    protected readonly endpointUrl: string,
    protected readonly assembler: TAssembler,
  ) {}

  getAll(): Observable<TEntity[]> {
    return this.http
      .get<TResponse | TResource[]>(this.endpointUrl, this.httpOptions)
      .pipe(
        map((response) => {
          if (Array.isArray(response)) {
            return response.map((resource) =>
              this.assembler.toEntityFromResource(resource),
            );
          }
          return this.assembler.toEntitiesFromResponse(response as TResponse);
        }),
        catchError(this.handleError('Failed to fetch collection')),
      );
  }

  getById(id: number): Observable<TEntity> {
    return this.http
      .get<TResource>(`${this.endpointUrl}/${id}`, this.httpOptions)
      .pipe(
        map((resource) => this.assembler.toEntityFromResource(resource)),
        catchError(this.handleError('Failed to fetch entity')),
      );
  }

  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http
      .post<TResource>(this.endpointUrl, resource, this.httpOptions)
      .pipe(
        map((created) => this.assembler.toEntityFromResource(created)),
        catchError(this.handleError('Failed to create entity')),
      );
  }

  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http
      .put<TResource>(`${this.endpointUrl}/${id}`, resource, this.httpOptions)
      .pipe(
        map((updated) => this.assembler.toEntityFromResource(updated)),
        catchError(this.handleError('Failed to update entity')),
      );
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.endpointUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError('Failed to delete entity')));
  }

  protected parseFieldErrorsFromError(error: HttpErrorResponse): Record<string, string> {
    const body = error.error;
    if (!body || typeof body !== 'object') {
      return {};
    }
    const errs = (body as Record<string, unknown>)['errors'];
    if (!Array.isArray(errs)) {
      return {};
    }
    const out: Record<string, string> = {};
    for (const item of errs) {
      if (item && typeof item === 'object') {
        const o = item as Record<string, unknown>;
        const field = o['field'];
        const msg =
          (typeof o['message'] === 'string' && o['message']) ||
          (typeof o['defaultMessage'] === 'string' && o['defaultMessage']) ||
          '';
        if (typeof field === 'string' && field && typeof msg === 'string' && msg.trim()) {
          out[field] = msg.trim();
        }
      }
    }
    return out;
  }

  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      console.error(`[BaseApiEndpoint] ${operation}`, {
        status: error.status,
        url: error.url,
        body: error.error,
      });

      const fieldErrors = this.parseFieldErrorsFromError(error);

      let errorMessage = operation;
      if (error.error instanceof ErrorEvent) {
        errorMessage = `${operation}: ${error.error.message}`;
      } else if (typeof error.error === 'string' && error.error.trim()) {
        errorMessage = `${operation}: ${error.error.trim()}`;
      } else if (Array.isArray((error.error as { errors?: unknown })?.errors)) {
        const errs = (error.error as { errors: Array<{ defaultMessage?: string; message?: string }> })
          .errors;
        const parts = errs.map((x) => x.defaultMessage || x.message).filter(Boolean);
        if (parts.length) {
          errorMessage = parts.join('. ');
        }
      } else if (
        typeof (error.error as { detail?: string })?.detail === 'string' &&
        (error.error as { detail: string }).detail
      ) {
        errorMessage = (error.error as { detail: string }).detail;
      } else if (
        error.error &&
        typeof error.error === 'object' &&
        typeof (error.error as { message?: unknown }).message === 'string' &&
        String((error.error as { message: string }).message).trim()
      ) {
        errorMessage = String((error.error as { message: string }).message).trim();
      } else if (error.status === 404) {
        errorMessage = `${operation}: Resource not found`;
      } else if (error.status === 401 || error.status === 403) {
        errorMessage = API_ERROR_UNAUTHORIZED;
      } else if (error.error?.message) {
        errorMessage = String(error.error.message);
      } else if (error.message) {
        errorMessage = error.message;
      }

      const err = new Error(errorMessage) as ApiError;
      if (Object.keys(fieldErrors).length > 0) {
        err.fieldErrors = fieldErrors;
      }
      return throwError(() => err);
    };
  }
}