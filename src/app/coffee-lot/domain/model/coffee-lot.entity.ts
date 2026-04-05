import type { BaseEntity } from '../../../shared/infrastructure/base-entity';

/**
 * Lote de café (dominio). {@code id === 0} en borradores de UI antes de persistir.
 */
export interface CoffeeLot extends BaseEntity {
  userId: number;
  supplier_id: number;
  lot_name: string;
  coffee_type: string;
  processing_method: string;
  altitude: number;
  weight: number;
  certifications: string[];
  origin: string;
  status: string;
}