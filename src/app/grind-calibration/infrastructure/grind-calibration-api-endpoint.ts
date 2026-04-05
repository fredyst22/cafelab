import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import type { GrindCalibrationEntry } from '../domain/model/grind-calibration-entry.entity';
import { GrindCalibrationEntryAssembler } from './grind-calibration-entry.assembler';
import type {
  CreateGrindCalibrationBody,
  GrindCalibrationListResponse,
  GrindCalibrationResource,
  UpdateGrindCalibrationBody,
} from './grind-calibration-entry.response';

@Injectable({
  providedIn: 'root',
})
export class GrindCalibrationApiEndpoint extends BaseApiEndpoint<
  GrindCalibrationEntry,
  GrindCalibrationResource,
  GrindCalibrationListResponse,
  GrindCalibrationEntryAssembler
> {
  private readonly gcAssembler: GrindCalibrationEntryAssembler;

  constructor(http: HttpClient, private readonly translate: TranslateService) {
    const assembler = new GrindCalibrationEntryAssembler();
    super(
      http,
      `${environment.serverBaseUrl}${environment.calibrationsEndpointPath}`,
      assembler,
    );
    this.gcAssembler = assembler;
  }

  override getAll(): Observable<GrindCalibrationEntry[]> {
    return this.http.get<GrindCalibrationResource[]>(this.endpointUrl, this.httpOptions).pipe(
      map((arr) => (Array.isArray(arr) ? arr : []).map((r) => this.assembler.toEntityFromResource(r))),
      catchError(this.handleError(this.translate.instant('GRIND_CALIBRATION_BC.ERRORS.LOAD'))),
    );
  }

  override getById(id: number): Observable<GrindCalibrationEntry> {
    return this.http
      .get<GrindCalibrationResource>(`${this.endpointUrl}/${id}`, this.httpOptions)
      .pipe(
        map((r) => this.assembler.toEntityFromResource(r)),
        catchError(this.handleError(this.translate.instant('GRIND_CALIBRATION_BC.ERRORS.DETAIL'))),
      );
  }

  override create(entity: GrindCalibrationEntry): Observable<GrindCalibrationEntry> {
    const body: CreateGrindCalibrationBody = this.gcAssembler.toCreateBody(entity);
    return this.http
      .post<GrindCalibrationResource>(this.endpointUrl, body, this.httpOptions)
      .pipe(
        map((r) => this.assembler.toEntityFromResource(r)),
        catchError(this.handleError(this.translate.instant('GRIND_CALIBRATION_BC.ERRORS.REGISTER'))),
      );
  }

  override update(entity: GrindCalibrationEntry, id: number): Observable<GrindCalibrationEntry> {
    const body: UpdateGrindCalibrationBody = this.gcAssembler.toUpdateBody(entity);
    return this.http
      .put<GrindCalibrationResource>(`${this.endpointUrl}/${id}`, body, this.httpOptions)
      .pipe(
        map((r) => this.assembler.toEntityFromResource(r)),
        catchError(this.handleError(this.translate.instant('GRIND_CALIBRATION_BC.ERRORS.UPDATE'))),
      );
  }
}