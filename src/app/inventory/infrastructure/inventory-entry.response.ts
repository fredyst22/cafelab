import type { BaseResource, BaseResponse } from '../../shared/infrastructure/base-resource';

export interface InventoryEntryListResponse extends BaseResponse {}

export interface InventoryEntryResource extends BaseResource {
  userId: number;
  coffeeLotId: number;
  quantityUsed: number;
  dateUsed: string;
  finalProduct: string;
}

export interface CreateInventoryEntryBody {
  coffeeLotId: number;
  quantityUsed: number;
  dateUsed: string;
  finalProduct: string;
}

export interface UpdateInventoryEntryBody {
  coffeeLotId: number;
  quantityUsed: number;
  dateUsed: string;
  finalProduct: string;
}