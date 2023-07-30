import { User as Request } from './user.base.request'
import { User as Entity } from './user.entity'

export const entityToRequest = (entity: Entity): Request => {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email
  }
}

export const entitiesToRequests = (entities: Entity[]): Request[] => {
  return entities.map(entityToRequest)
}
