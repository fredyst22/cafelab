import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrewRecipeApi } from '../../brew-recipe/application/brew-recipe.api';
import type { Recipe } from '../domain/model/recipe.entity';

/**
 * Fachada hacia {@link BrewRecipeApi}; el listado y CRUD quedan acotados al perfil del JWT en el servidor.
 */
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private readonly brewRecipeApi: BrewRecipeApi) {}

  getAll(): Observable<Recipe[]> {
    return this.brewRecipeApi.getAll();
  }

  getById(id: number | string): Observable<Recipe> {
    return this.brewRecipeApi.getById(Number(id));
  }

  create(recipe: Recipe): Observable<Recipe> {
    return this.brewRecipeApi.create(recipe);
  }

  update(id: number | string, recipe: Recipe): Observable<Recipe> {
    return this.brewRecipeApi.update(Number(id), recipe);
  }

  delete(id: number): Observable<void> {
    return this.brewRecipeApi.delete(id);
  }
}