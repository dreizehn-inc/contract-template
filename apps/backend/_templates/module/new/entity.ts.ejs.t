---
to: src/<%= moduleName %>/<%= moduleName %>.entity.ts
---

<% function toSnakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
} %>

<% function toPlural(str) {
  return str.endsWith('y') ? str.slice(0, -1) + 'ies' : str + 's';
} %>

<% function toCamelCase(str) {
  return str.replace(/_./g, function(match) {
    return match.charAt(1).toUpperCase();
  }).replace(/^./, function(match) {
    return match.toUpperCase();
  });
} %>

<% const className = toCamelCase(moduleName) %>
<% const entityName = toSnakeCase(className) %>
<% const tableName = toPlural(entityName) %>

import { Entity, Column, PrimaryColumn, Repository } from 'typeorm';

import { BaseEntity } from '../base/base.entity';

@Entity({ name: '<%= tableName %>' })
export class <%= className %> extends BaseEntity {
  @PrimaryColumn()
  id: string;

<% for (const column of columns) { -%>
  @Column()
  <%= column %>: string;

<% } -%>
}

export class <%= className %>Repository extends Repository<<%= className %>> {}
