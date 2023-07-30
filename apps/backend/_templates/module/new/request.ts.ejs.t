---
to: src/<%= moduleName %>/<%= moduleName %>.request.ts
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
<% const classNames = toPlural(className) %>
<% const lowerCamelClassNames = toPlural(lowerCamelClassName) %>

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { Pagination, PaginationQuery } from '../base/base.request';
import { <%= className %> } from './<%= moduleName %>.base.request';


// LIST /<%= tableName %>

export abstract class PublicList<%= classNames %>RequestQuery extends PaginationQuery {}

export abstract class PublicList<%= classNames %>Response {
  @ApiProperty({ type: <%= className %>, isArray: true, required: true })
  <%= lowerCamelClassNames %>: <%= className %>[]

  @ApiProperty({ type: Pagination })
  pagination: Pagination
}

// POST /<%= tableName %>
export abstract class PublicCreate<%= className %>RequestBody {
<% for (const column of columns) { -%>
  @ApiProperty({ required: true })
  @IsString()
  <%= column %>: string;

<% } -%>
}
export abstract class PublicCreate<%= className %>Response {
  @ApiProperty({ type: <%= className %> })
  <%= lowerCamelClassName %>: <%= className %>
}

// GET /<%= tableName %>/{id}
export abstract class PublicGet<%= className %>RequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}
export abstract class PublicGet<%= className %>Response {
  @ApiProperty({ type: <%= className %> })
  <%= lowerCamelClassName %>: <%= className %>
}

// PATCH /<%= tableName %>/{id}
export abstract class PublicUpdate<%= className %>RequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}

export abstract class PublicUpdate<%= className %>RequestBody {
<% for (const column of columns) { -%>
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  <%= column %>: string;

<% } -%>
}
export abstract class PublicUpdate<%= className %>Response {
  @ApiProperty({ type: <%= className %> })
  <%= lowerCamelClassName %>: <%= className %>
}

// DELETE /<%= tableName %>/{id}
export abstract class PublicDelete<%= className %>RequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}

