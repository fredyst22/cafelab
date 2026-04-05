import type { BaseEntity } from '../../../shared/infrastructure/base-entity';

export interface BrewPortfolioEntry extends BaseEntity {
  userId: number;
  name: string;
  createdAt: string | null;
}