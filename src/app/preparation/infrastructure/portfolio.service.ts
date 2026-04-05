import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrewPortfolioApi } from '../../brew-portfolio/application/brew-portfolio.api';
import type { Portfolio } from '../domain/model/portfolio.entity';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  constructor(private readonly brewPortfolioApi: BrewPortfolioApi) {}

  getAll(): Observable<Portfolio[]> {
    return this.brewPortfolioApi.getAll();
  }

  getById(id: number): Observable<Portfolio> {
    return this.brewPortfolioApi.getById(id);
  }

  create(portfolio: Portfolio): Observable<Portfolio> {
    return this.brewPortfolioApi.create(portfolio);
  }

  update(id: number, portfolio: Portfolio): Observable<Portfolio> {
    return this.brewPortfolioApi.update(id, portfolio);
  }

  delete(id: number): Observable<void> {
    return this.brewPortfolioApi.delete(id);
  }
}