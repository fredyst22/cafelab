import type { BaseEntity } from '../../../shared/infrastructure/base-entity';

export interface DefectLibraryEntry extends BaseEntity {
  userId: number | null;
  coffeeDisplayName: string;
  coffeeRegion: string | null;
  coffeeVariety: string | null;
  coffeeTotalWeight: number | null;
  name: string;
  defectType: string;
  defectWeight: number;
  percentage: number;
  probableCause: string;
  suggestedSolution: string;
}