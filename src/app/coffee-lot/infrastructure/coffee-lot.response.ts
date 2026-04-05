import type { BaseResource, BaseResponse } from '../../shared/infrastructure/base-resource';

export interface CoffeeLotListResponse extends BaseResponse {}

/** Alineado con {@code CoffeeLotResource} del backend. */
export interface CoffeeLotResource extends BaseResource {
  userId: number;
  supplier_id: number;
  lot_name: string;
  coffee_type: string;
  processing_method: string;
  altitude: number;
  weight: number;
  origin: string;
  status: string;
  certifications: string[] | null;
}

export interface CreateCoffeeLotResourceBody {
  supplier_id: number;
  lot_name: string;
  coffee_type: string;
  processing_method: string;
  altitude: number;
  weight: number;
  origin: string;
  status: string;
  certifications: string[];
}

export interface UpdateCoffeeLotResourceBody {
  lot_name: string;
  coffee_type: string;
  processing_method: string;
  altitude: number;
  weight: number;
  origin: string;
  status: string;
  certifications: string[];
}