import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import type { BrewPortfolioEntry } from '../domain/model/brew-portfolio-entry.entity';
import { BrewPortfolioEntryAssembler } from './brew-portfolio-entry.assembler';
import type {
  BrewPortfolioListResponse,
  BrewPortfolioResource,
  CreateBrewPortfolioBody,
  UpdateBrewPortfolioBody,
} from './brew-portfolio-entry.response';

@Injectable({
  providedIn: 'root',
})
export class BrewPortfolioApiEndpoint extends BaseApiEndpoint<
  BrewPortfolioEntry,
  BrewPortfolioResource,
  BrewPortfolioListResponse,
  BrewPortfolioEntryAssembler
> {
  private readonly bpAssembler: BrewPortfolioEntryAssembler;

  constructor(http: HttpClient, private readonly translate: TranslateService) {
    const assembler = new BrewPortfolioEntryAssembler();
    super(http, `${environment.serverBaseUrl}${environment.portfoliosEndpointPath}`, assembler);
    this.bpAssembler = assembler;
  }

  override getAll(): Observable<BrewPortfolioEntry[]> {
    return this.http.get<BrewPortfolioResource[]>(this.endpointUrl, this.httpOptions).pipe(
      map((arr) => (Array.isArray(arr) ? arr : []).map((r) => this.assembler.toEntityFromResource(r))),
      catchError(this.handleError(this.translate.instant('PORTFOLIO_BC.ERRORS.LOAD'))),
    );
  }

  override getById(id: number): Observable<BrewPortfolioEntry> {
    return this.http.get<BrewPortfolioResource>(`${this.endpointUrl}/${id}`, this.httpOptions).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError(this.translate.instant('PORTFOLIO_BC.ERRORS.DETAIL'))),
    );
  }

  override create(entity: BrewPortfolioEntry): Observable<BrewPortfolioEntry> {
    const body: CreateBrewPortfolioBody = this.bpAssembler.toCreateBody(entity);
    return this.http.post<BrewPortfolioResource>(this.endpointUrl, body, this.httpOptions).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError(this.translate.instant('PORTFOLIO_BC.ERRORS.REGISTER'))),
    );
  }

  override update(entity: BrewPortfolioEntry, id: number): Observable<BrewPortfolioEntry> {
    const body: UpdateBrewPortfolioBody = this.bpAssembler.toUpdateBody(entity);
    return this.http.put<BrewPortfolioResource>(`${this.endpointUrl}/${id}`, body, this.httpOptions).pipe(
      map((r) => this.assembler.toEntityFromResource(r)),
      catchError(this.handleError(this.translate.instant('PORTFOLIO_BC.ERRORS.UPDATE'))),
    );
  }

  override delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.endpointUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError(this.translate.instant('PORTFOLIO_BC.ERRORS.DELETE'))));
  }
}