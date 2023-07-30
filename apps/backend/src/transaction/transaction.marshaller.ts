import { Transaction as Request } from './transaction.base.request'
import { Transaction as Entity } from './transaction.entity'

export const entityToRequest = (entity: Entity): Request => {
  return {
    id: entity.id,
    hash: entity.hash,
    status: entity.status
  }
}

export const entitiesToRequests = (entities: Entity[]): Request[] => {
  return entities.map(entityToRequest)
}
