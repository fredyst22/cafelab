import type { BaseEntity } from '../../../shared/infrastructure/base-entity';

export type ExtractionMethod =
  | 'espresso'
  | 'pour-over'
  | 'french-press'
  | 'cold-brew'
  | 'aeropress'
  | 'chemex'
  | 'v60'
  | 'clever';

export interface BrewRecipeIngredientEntry extends BaseEntity {
  recipeId: number;
  name: string;
  amount: number;
  unit: string;
}

export interface BrewRecipeEntry extends BaseEntity {
  userId: number;
  name: string;
  imageUrl: string;
  extractionMethod: ExtractionMethod;
  extractionCategory: 'coffee' | 'espresso';
  ratio: string;
  cuppingSessionId: number | null;
  portfolioId: number | null;
  preparationTime: number;
  steps: string;
  tips: string;
  cupping: string;
  grindSize: string;
  createdAt: string;
  ingredients: BrewRecipeIngredientEntry[];
}