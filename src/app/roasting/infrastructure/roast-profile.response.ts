import type { BaseResource, BaseResponse } from '../../shared/infrastructure/base-resource';

export interface RoastProfileListResponse extends BaseResponse {}

/** Alineado con {@code RoastProfileResource} del backend ({@code lot} = coffee lot id). */
export interface RoastProfileResource extends BaseResource {
  userId: number;
  name: string;
  type: string;
  duration: number;
  tempStart: number;
  tempEnd: number;
  isFavorite: boolean;
  createdAt: string;
  lot: number;
}

export interface CreateRoastProfileBody {
  name: string;
  type: string;
  duration: number;
  tempStart: number;
  tempEnd: number;
  lot: number;
  isFavorite?: boolean;
}

export interface UpdateRoastProfileBody {
  name: string;
  type: string;
  duration: number;
  tempStart: number;
  tempEnd: number;
  lot: number;
  isFavorite: boolean;
}