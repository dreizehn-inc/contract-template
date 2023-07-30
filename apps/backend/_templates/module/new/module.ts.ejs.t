---
to: src/<%= moduleName %>/<%= moduleName %>.module.ts
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

<% function toLowerCamelCase(str) {
  return str.replace(/_./g, function(match) {
    return match.charAt(1).toUpperCase();
  });
} %>

<% const className = toCamelCase(moduleName) %>
<% const lowerCamelClassName = toLowerCamelCase(moduleName) %>
<% const entityName = toSnakeCase(className) %>
<% const tableName = toPlural(entityName) %>

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoggerModule } from '../logger/logger.module'
import { Admin<%= className %>Controller } from './<%= moduleName %>.admin.controller'
import { Admin<%= className %>Service } from './<%= moduleName %>.admin.service'
import { <%= className %>Controller } from './<%= moduleName %>.controller'
import { <%= className %> } from './<%= moduleName %>.entity'
import { <%= className %>Service } from './<%= moduleName %>.service'

@Module({
  imports: [TypeOrmModule.forFeature([<%= className %>]), LoggerModule],
  controllers: [Admin<%= className %>Controller, <%= className %>Controller],
  providers: [Admin<%= className %>Service, <%= className %>Service]
})
export class <%= className %>Module {}
