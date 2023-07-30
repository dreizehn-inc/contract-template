---
to: src/<%= moduleName %>/<%= moduleName %>.controller.ts
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

import { AuthGuard } from '../auth/auth.guard'
import { newPagination } from '../pagination'
import { PUBLIC_SERVICE } from '../swagger'
import {
  PublicList<%= classNames %>Response,
  PublicCreate<%= className %>Response,
  PublicCreate<%= className %>RequestBody,
  PublicGet<%= className %>RequestParam,
  PublicGet<%= className %>Response,
  PublicList<%= classNames %>RequestQuery,
  PublicUpdate<%= className %>RequestParam,
  PublicUpdate<%= className %>Response,
  PublicUpdate<%= className %>RequestBody,
  PublicDelete<%= className %>RequestParam
} from './<%= moduleName %>.request'
import { <%= className %>Service } from './<%= moduleName %>.service'

@ApiTags(PUBLIC_SERVICE)
@Controller('<%= tableName %>')
@UseGuards(AuthGuard)
export class <%= className %>Controller {
  constructor(private readonly <%= lowerCamelClassName %>Service: <%= className %>Service) {}

  @ApiOperation({ summary: '<%= className %>の一覧取得' })
  @ApiOkResponse({ type: PublicList<%= classNames %>Response })
  @Get()
  async list(@Query() param: PublicList<%= classNames %>RequestQuery): Promise<PublicList<%= classNames %>Response> {
    const { <%= lowerCamelClassNames %>, ttlCnt } = await this.<%= lowerCamelClassName %>Service.list(param)
    const pagination = newPagination({ page: param.page, perPage: param.perPage, ttlCnt })
    return { <%= lowerCamelClassNames %>,  pagination }
  }

  @ApiOperation({ summary: '<%= className %>を新規作成' })
  @ApiCreatedResponse({ type: PublicCreate<%= className %>Response })
  @Post()
  async create(@Body() param: PublicCreate<%= className %>RequestBody): Promise<PublicCreate<%= className %>Response> {
    return { <%= lowerCamelClassName %>: await this.<%= lowerCamelClassName %>Service.create(param) }
  }

  @ApiOperation({ summary: '<%= className %>の詳細取得' })
  @ApiOkResponse({ type: PublicGet<%= className %>Response })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  async get(@Param('id') id: PublicGet<%= className %>RequestParam['id']): Promise<PublicGet<%= className %>Response> {
    return { <%= lowerCamelClassName %>: await this.<%= lowerCamelClassName %>Service.get({ id }) }
  }

  @ApiOperation({ summary: '<%= className %>の情報更新' })
  @ApiOkResponse({ type: PublicUpdate<%= className %>Response })
  @ApiParam({ name: 'id', type: 'string' })
  @Patch(':id')
  async update(
    @Param('id') id: PublicUpdate<%= className %>RequestParam['id'],
    @Body() param: PublicUpdate<%= className %>RequestBody
  ): Promise<PublicUpdate<%= className %>Response> {
    return { <%= lowerCamelClassName %>: await this.<%= lowerCamelClassName %>Service.update(id, param) }
  }

  @ApiOperation({ summary: '<%= className %>の削除' })
  @ApiNoContentResponse()
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  async delete(@Param('id') id: PublicDelete<%= className %>RequestParam['id']): Promise<null> {
    await this.<%= lowerCamelClassName %>Service.delete(id)
    return null
  }
}


