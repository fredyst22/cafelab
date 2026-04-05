import type { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import type { CoffeeLot } from '../domain/model/coffee-lot.entity';
import type {
  CoffeeLotListResponse,
  CoffeeLotResource,
  CreateCoffeeLotResourceBody,
  UpdateCoffeeLotResourceBody,
} from './coffee-lot.response';

export class CoffeeLotAssembler
  implements BaseAssembler<CoffeeLot, CoffeeLotResource, CoffeeLotListResponse>
{
  toEntityFromResource(resource: CoffeeLotResource): CoffeeLot {
    return {
      id: resource.id,
      userId: resource.userId,
      supplier_id: resource.supplier_id,
      lot_name: resource.lot_name ?? '',
      coffee_type: resource.coffee_type ?? '',
      processing_method: resource.processing_method ?? '',
      altitude: Number(resource.altitude),
      weight: Number(resource.weight),
      origin: resource.origin ?? '',
      status: resource.status ?? '',
      certifications: resource.certifications ? [...resource.certifications] : [],
    };
  }

  toResourceFromEntity(entity: CoffeeLot): CoffeeLotResource {
    return {
      id: entity.id,
      userId: entity.userId,
      supplier_id: entity.supplier_id,
      lot_name: entity.lot_name,
      coffee_type: entity.coffee_type,
      processing_method: entity.processing_method,
      altitude: entity.altitude,
      weight: entity.weight,
      origin: entity.origin,
      status: entity.status,
      certifications: entity.certifications ?? [],
    };
  }

  toEntitiesFromResponse(_response: CoffeeLotListResponse): CoffeeLot[] {
    return [];
  }

  toCreateResource(entity: CoffeeLot): CreateCoffeeLotResourceBody {
    return {
      supplier_id: Number(entity.supplier_id),
      lot_name: entity.lot_name.trim(),
      coffee_type: entity.coffee_type.trim(),
      processing_method: entity.processing_method.trim(),
      altitude: Number(entity.altitude),
      weight: Number(entity.weight),
      origin: entity.origin.trim(),
      status: entity.status.trim(),
      certifications: entity.certifications ?? [],
    };
  }

  toUpdateResource(entity: CoffeeLot): UpdateCoffeeLotResourceBody {
    return {
      lot_name: entity.lot_name.trim(),
      coffee_type: entity.coffee_type.trim(),
      processing_method: entity.processing_method.trim(),
      altitude: Number(entity.altitude),
      weight: Number(entity.weight),
      origin: entity.origin.trim(),
      status: entity.status.trim(),
      certifications: entity.certifications ?? [],
    };
  }
}