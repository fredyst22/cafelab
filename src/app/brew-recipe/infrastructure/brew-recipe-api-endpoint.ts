import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import type { BrewRecipeEntry } from '../domain/model/brew-recipe-entry.entity';
import { BrewRecipeEntryAssembler } from './brew-recipe-entry.assembler';
import type {
  BrewRecipeListResponse,
  BrewRecipeResource,
  CreateBrewRecipeBody,
  UpdateBrewRecipeBody,
} from './brew-recipe-entry.response';

@Injectable({
  providedIn: 'root',
})
export class BrewRecipeApiEndpoint extends BaseApiEndpoint<
  BrewRecipeEntry,
  BrewRecipeResource,
  BrewRecipeListResponse,
  BrewRecipeEntryAssembler
> {
  private readonly brAssembler: BrewRecipeEntryAssembler;

  constructor(http: HttpClient, private readonly translate: TranslateService) {
    const assembler = new BrewRecipeEntryAssembler();
    super(http, `${environment.serverBaseUrl}${environment.recipesEndpointPath}`, assembler);
    this.brAssembler = assembler;
  }

  override getAll(): Observable<BrewRecipeEntry[]> {
    return this.http.get<BrewRecipeResource[]>(this.endpointUrl, this.httpOptions).pipe(
      map((arr) => (Array.isArray(arr) ? arr : []).map((r) => this.assembler.toEntityFromResource(r))),
      catchError(this.handleError(this.translate.instant('RECIPE_BC.ERRORS.LOAD'))),
    );
  }

  override getById(id: number): Observable<BrewRecipeEntry> {
    return this.http.get<BrewRecipeResource>(`${this.endpointUrl}/${id}`, this.httpOptions).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError(this.translate.instant('RECIPE_BC.ERRORS.DETAIL'))),
    );
  }

  override create(entity: BrewRecipeEntry): Observable<BrewRecipeEntry> {
    const body: CreateBrewRecipeBody = this.brAssembler.toCreateBody(entity);
    return this.http.post<BrewRecipeResource>(this.endpointUrl, body, this.httpOptions).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError(this.translate.instant('RECIPE_BC.ERRORS.REGISTER'))),
    );
  }

  override update(entity: BrewRecipeEntry, id: number): Observable<BrewRecipeEntry> {
    const body: UpdateBrewRecipeBody = this.brAssembler.toUpdateBody(entity);
    return this.http.put<BrewRecipeResource>(`${this.endpointUrl}/${id}`, body, this.httpOptions).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError(this.translate.instant('RECIPE_BC.ERRORS.UPDATE'))),
    );
  }

  override delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.endpointUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError(this.translate.instant('RECIPE_BC.ERRORS.DELETE'))));
  }
}