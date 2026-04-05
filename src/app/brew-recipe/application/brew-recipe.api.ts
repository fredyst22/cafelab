import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrewRecipeApiEndpoint } from '../infrastructure/brew-recipe-api-endpoint';
import type { BrewRecipeEntry } from '../domain/model/brew-recipe-entry.entity';

@Injectable({
  providedIn: 'root',
})
export class BrewRecipeApi {
  constructor(private readonly endpoint: BrewRecipeApiEndpoint) {}

  getAll(): Observable<BrewRecipeEntry[]> {
    return this.endpoint.getAll();
  }

  getById(id: number): Observable<BrewRecipeEntry> {
    return this.endpoint.getById(id);
  }

  create(entity: BrewRecipeEntry): Observable<BrewRecipeEntry> {
    return this.endpoint.create(entity);
  }

  update(id: number, entity: BrewRecipeEntry): Observable<BrewRecipeEntry> {
    return this.endpoint.update(entity, id);
  }

  delete(id: number): Observable<void> {
    return this.endpoint.delete(id);
  }
}