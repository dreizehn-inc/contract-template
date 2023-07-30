---
to: src/<%= moduleName %>/<%= moduleName %>.marshaller.ts
---

<% function toCamelCase(str) {
  return str.replace(/_./g, function(match) {
    return match.charAt(1).toUpperCase();
  }).replace(/^./, function(match) {
    return match.toUpperCase();
  });
} %>

<% const className = toCamelCase(moduleName) %>


import { <%= className %> as Request } from './<%= moduleName %>.base.request'
import { <%= className %> as Entity } from './<%= moduleName %>.entity'

export const entityToRequest = (entity: Entity): Request => {
  return {
    id: entity.id,
<% for (const column of columns) { -%>
    <%= column %>: entity.<%= column %>,
<% } -%>
  }
}

export const entitiesToRequests = (entities: Entity[]): Request[] => {
  return entities.map(entityToRequest)
}