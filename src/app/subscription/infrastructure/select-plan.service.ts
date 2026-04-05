import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/infrastructure/base.service';
import { SelectPlan } from '../domain/model/select-plan.entity';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { retry, catchError } from 'rxjs';
import {environment} from '../../../environments/environment'
import {User} from '../../auth/domain/model/user.entity';

const plansResourceEndPointPath =environment.plansEndPointPath
@Injectable({
  providedIn: 'root'
})
export class SelectPlanService extends BaseService<SelectPlan> {
  override resourceEndpoint = plansResourceEndPointPath;

  /**
   * Obtiene el plan de un usuario por su ID de usuario
   * @param idUser - ID del usuario
   */
  getByUserId(idUser: string): Observable<SelectPlan[]> {
    const params = new HttpParams().set('idUser', idUser);
    return this.http.get<SelectPlan[]>(this.resourcePath(), { ...this.httpOptions, params })
      .pipe(retry(2), catchError(this.handleError));
  }
}