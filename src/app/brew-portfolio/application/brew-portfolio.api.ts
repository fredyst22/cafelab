import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrewPortfolioApiEndpoint } from '../infrastructure/brew-portfolio-api-endpoint';
import type { BrewPortfolioEntry } from '../domain/model/brew-portfolio-entry.entity';

@Injectable({
  providedIn: 'root',
})
export class BrewPortfolioApi {
  constructor(private readonly endpoint: BrewPortfolioApiEndpoint) {}

  getAll(): Observable<BrewPortfolioEntry[]> {
    return this.endpoint.getAll();
  }

  getById(id: number): Observable<BrewPortfolioEntry> {
    return this.endpoint.getById(id);
  }

  create(entity: BrewPortfolioEntry): Observable<BrewPortfolioEntry> {
    return this.endpoint.create(entity);
  }

  update(id: number, entity: BrewPortfolioEntry): Observable<BrewPortfolioEntry> {
    return this.endpoint.update(entity, id);
  }

  delete(id: number): Observable<void> {
    return this.endpoint.delete(id);
  }
}