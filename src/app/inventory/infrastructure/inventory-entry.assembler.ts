import type { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import type { InventoryEntry } from '../domain/model/inventory-entry.entity';
import type {
  CreateInventoryEntryBody,
  InventoryEntryListResponse,
  InventoryEntryResource,
  UpdateInventoryEntryBody,
} from './inventory-entry.response';

export class InventoryEntryAssembler
  implements
    BaseAssembler<
      InventoryEntry,
      InventoryEntryResource,
      InventoryEntryListResponse
    >
{
  toEntityFromResource(resource: InventoryEntryResource): InventoryEntry {
    return {
      id: resource.id,
      userId: resource.userId,
      coffeeLotId: resource.coffeeLotId,
      quantityUsed: Number(resource.quantityUsed),
      dateUsed:
        typeof resource.dateUsed === 'string'
          ? resource.dateUsed
          : String(resource.dateUsed),
      finalProduct: resource.finalProduct ?? '',
    };
  }

  toResourceFromEntity(entity: InventoryEntry): InventoryEntryResource {
    return {
      id: entity.id,
      userId: entity.userId,
      coffeeLotId: entity.coffeeLotId,
      quantityUsed: entity.quantityUsed,
      dateUsed: entity.dateUsed,
      finalProduct: entity.finalProduct,
    };
  }

  toEntitiesFromResponse(_response: InventoryEntryListResponse): InventoryEntry[] {
    return [];
  }

  toCreateResource(entity: InventoryEntry): CreateInventoryEntryBody {
    const iso = new Date(entity.dateUsed).toISOString();
    return {
      coffeeLotId: Number(entity.coffeeLotId),
      quantityUsed: Number(entity.quantityUsed),
      dateUsed: iso.slice(0, 19),
      finalProduct: entity.finalProduct.trim(),
    };
  }

  toUpdateResource(entity: InventoryEntry): UpdateInventoryEntryBody {
    return {
      coffeeLotId: Number(entity.coffeeLotId),
      quantityUsed: Number(entity.quantityUsed),
      dateUsed: this.toCreateResource(entity).dateUsed,
      finalProduct: entity.finalProduct.trim(),
    };
  }
}