---
to: src/<%= moduleName %>/<%= moduleName %>.admin.request.ts
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


// LIST /admin/<%= tableName %>

export abstract class AdminList<%= classNames %>RequestQuery extends PaginationQuery {}

export abstract class AdminList<%= classNames %>Response {
  @ApiProperty({ type: <%= className %>, isArray: true, required: true })
  <%= lowerCamelClassNames %>: <%= className %>[]

  @ApiProperty({ type: Pagination })
  pagination: Pagination
}

// POST /admin/<%= tableName %>
export abstract class AdminCreate<%= className %>RequestBody {
<% for (const column of columns) { -%>
  @ApiProperty({ required: true })
  @IsString()
  <%= column %>: string;

<% } -%>
}
export abstract class AdminCreate<%= className %>Response {
  @ApiProperty({ type: <%= className %> })
  <%= lowerCamelClassName %>: <%= className %>
}

// GET /admin/<%= tableName %>/{id}
export abstract class AdminGet<%= className %>RequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}
export abstract class AdminGet<%= className %>Response {
  @ApiProperty({ type: <%= className %> })
  <%= lowerCamelClassName %>: <%= className %>
}

// PATCH /admin/<%= tableName %>/{id}
export abstract class AdminUpdate<%= className %>RequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}

export abstract class AdminUpdate<%= className %>RequestBody {
<% for (const column of columns) { -%>
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  <%= column %>: string;

<% } -%>
}
export abstract class AdminUpdate<%= className %>Response {
  @ApiProperty({ type: <%= className %> })
  <%= lowerCamelClassName %>: <%= className %>
}

// DELETE /admin/<%= tableName %>/{id}
export abstract class AdminDelete<%= className %>RequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}

