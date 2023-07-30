---
to: src/<%= moduleName %>/<%= moduleName %>.admin.controller.ts
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


import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger'

import { AdminAuthGuard } from '../auth/auth.guard'
import { newPagination } from '../pagination'
import { ADMIN_SERVICE } from '../swagger'
import {
  AdminList<%= classNames %>Response,
  AdminCreate<%= className %>Response,
  AdminCreate<%= className %>RequestBody,
  AdminGet<%= className %>RequestParam,
  AdminGet<%= className %>Response,
  AdminList<%= classNames %>RequestQuery,
  AdminUpdate<%= className %>RequestParam,
  AdminUpdate<%= className %>Response,
  AdminUpdate<%= className %>RequestBody,
  AdminDelete<%= className %>RequestParam
} from './<%= moduleName %>.admin.request'
import { Admin<%= className %>Service } from './<%= moduleName %>.admin.service'

@ApiTags(ADMIN_SERVICE)
@Controller('admin/<%= tableName %>')
@UseGuards(AdminAuthGuard)
export class Admin<%= className %>Controller {
  constructor(private readonly <%= lowerCamelClassName %>Service: Admin<%= className %>Service) {}

  @ApiOperation({ summary: '<%= className %>の一覧取得' })
  @ApiOkResponse({ type: AdminList<%= classNames %>Response })
  @Get()
  async list(@Query() param: AdminList<%= classNames %>RequestQuery): Promise<AdminList<%= classNames %>Response> {
    const { <%= lowerCamelClassNames %>, ttlCnt } = await this.<%= lowerCamelClassName %>Service.list(param)
    const pagination = newPagination({ page: param.page, perPage: param.perPage, ttlCnt })
    return { <%= lowerCamelClassNames %>,  pagination }
  }

  @ApiOperation({ summary: '<%= className %>を新規作成' })
  @ApiCreatedResponse({ type: AdminCreate<%= className %>Response })
  @Post()
  async create(@Body() param: AdminCreate<%= className %>RequestBody): Promise<AdminCreate<%= className %>Response> {
    return { <%= lowerCamelClassName %>: await this.<%= lowerCamelClassName %>Service.create(param) }
  }

  @ApiOperation({ summary: '<%= className %>の詳細取得' })
  @ApiOkResponse({ type: AdminGet<%= className %>Response })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  async get(@Param('id') id: AdminGet<%= className %>RequestParam['id']): Promise<AdminGet<%= className %>Response> {
    return { <%= lowerCamelClassName %>: await this.<%= lowerCamelClassName %>Service.get({ id }) }
  }

  @ApiOperation({ summary: '<%= className %>の情報更新' })
  @ApiOkResponse({ type: AdminUpdate<%= className %>Response })
  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  async update(
    @Param('id') id: AdminUpdate<%= className %>RequestParam['id'],
    @Body() param: AdminUpdate<%= className %>RequestBody
  ): Promise<AdminUpdate<%= className %>Response> {
    return { <%= lowerCamelClassName %>: await this.<%= lowerCamelClassName %>Service.update(id, param) }
  }

  @ApiOperation({ summary: '<%= className %>の削除' })
  @ApiNoContentResponse()
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  async delete(@Param('id') id: AdminDelete<%= className %>RequestParam['id']): Promise<null> {
    await this.<%= lowerCamelClassName %>Service.delete(id)
    return null
  }
}


