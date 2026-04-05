import type { BaseEntity } from './base-entity';
import type { BaseResource, BaseResponse } from './base-resource';

export interface BaseAssembler<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
> {
  toEntityFromResource(resource: TResource): TEntity;
  toResourceFromEntity(entity: TEntity): TResource;
  toEntitiesFromResponse(response: TResponse): TEntity[];
}