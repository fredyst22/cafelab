import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * Shared CRUD helper for JSON REST APIs under {@link environment.serverBaseUrl}.
 * Subclasses set {@link resourceEndpoint} (and optionally {@link serverBaseUrl}).
 */
@Injectable()
export abstract class BaseService<T> {
  protected readonly http: HttpClient;
  serverBaseUrl = environment.serverBaseUrl;
  resourceEndpoint = '';

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  protected constructor(http?: HttpClient) {
    this.http = http ?? inject(HttpClient);
  }

  resourcePath(): string {
    return `${this.serverBaseUrl}${this.resourceEndpoint}`;
  }

  getAll(): Observable<T[]> {
    return this.http
      .get<T[]>(this.resourcePath(), this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getById(id: number | string): Observable<T> {
    return this.http
      .get<T>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  create(entity: T): Observable<T> {
    return this.http
      .post<T>(this.resourcePath(), entity, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  update(id: number | string, entity: T): Observable<T> {
    return this.http
      .put<T>(`${this.resourcePath()}/${id}`, entity, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  handleError = (error: HttpErrorResponse) => {
    let message = 'Request failed';
    if (error.error instanceof ErrorEvent) {
      message = error.error.message;
    } else if (typeof error.error === 'string') {
      message = error.error;
    } else if (Array.isArray((error.error as { errors?: unknown })?.errors)) {
      const errs = (error.error as { errors: Array<{ defaultMessage?: string; message?: string }> })
        .errors;
      const parts = errs.map((x) => x.defaultMessage || x.message).filter(Boolean);
      if (parts.length) {
        message = parts.join('. ');
      }
    } else if (
      typeof (error.error as { detail?: string })?.detail === 'string' &&
      (error.error as { detail: string }).detail
    ) {
      message = (error.error as { detail: string }).detail;
    } else if (error.error?.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }
    console.error('[BaseService]', message, error);
    return throwError(() => new Error(message));
  };
}