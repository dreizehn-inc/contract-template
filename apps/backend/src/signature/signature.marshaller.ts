import { Signature as Request } from './signature.base.request'
import { Signature as Entity } from './signature.entity'

export const entityToRequest = (entity: Entity): Request => {
  return {
    id: entity.id,
    sign: entity.sign,
    deadline: entity.deadline,
    tokenId: entity.tokenId,
    chainId: entity.chainId
  }
}

export const entitiesToRequests = (entities: Entity[]): Request[] => {
  return entities.map(entityToRequest)
}
