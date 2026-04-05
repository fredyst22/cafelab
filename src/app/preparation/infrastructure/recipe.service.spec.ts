import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RecipeService } from './recipe.service';
import { BrewRecipeApi } from '../../brew-recipe/application/brew-recipe.api';

describe('RecipeService', () => {
  let service: RecipeService;
  const brewRecipeApiStub = {
    getAll: () => of([]),
    getById: () => of({} as never),
    create: () => of({} as never),
    update: () => of({} as never),
    delete: () => of(undefined),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeService,
        { provide: BrewRecipeApi, useValue: brewRecipeApiStub },
      ],
    });
    service = TestBed.inject(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});