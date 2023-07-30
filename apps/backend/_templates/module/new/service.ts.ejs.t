---
to: src/<%= moduleName %>/<%= moduleName %>.service.ts
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


import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, IsNull } from 'typeorm'

import { Logger } from '../logger/logger.service'
import { calcPaginationParam, datetime, uid } from '../util'
import {
  PublicCreate<%= className %>RequestBody,
  PublicDelete<%= className %>RequestParam,
  PublicGet<%= className %>RequestParam,
  PublicList<%= classNames %>RequestQuery,
  PublicUpdate<%= className %>RequestBody,
  PublicUpdate<%= className %>RequestParam
} from './<%= moduleName %>.request'
import { <%= className %> as <%= className %>Response } from './<%= moduleName %>.base.request'
import { <%= className %>, <%= className %>Repository } from './<%= moduleName %>.entity'
import * as marshaller from './<%= moduleName %>.marshaller'

@Injectable()
export class <%= className %>Service {
  private readonly logger = new Logger()
  constructor(
    @InjectRepository(<%= className %>)
    private <%= lowerCamelClassName %>Repository: <%= className %>Repository
  ) {}

  async list(param: PublicList<%= classNames %>RequestQuery) {
    const { skip, take } = calcPaginationParam(param.page, param.perPage)

    let where: FindManyOptions<<%= className %>>['where'] = {
      deletedAt: IsNull()
    }
    const entities = await this.<%= lowerCamelClassName %>Repository.find({ where, skip, take }).catch(e => {
      this.logger.error(e)
      throw new NotFoundException(`<%= className %> not found.`)
    })
    const ttlCnt = await this.<%= lowerCamelClassName %>Repository.count({ where })
    return { <%= lowerCamelClassNames %>: marshaller.entitiesToRequests(entities), ttlCnt }
  }

  async create(param: PublicCreate<%= className %>RequestBody): Promise<<%= className %>Response> {
    const <%= lowerCamelClassName %> = new <%= className %>()
    <%= lowerCamelClassName %>.id = uid.new()
<% for (const column of columns) { -%>
    <%= lowerCamelClassName %>.<%= column %> = param.<%= column %>;
<% } -%>
    const now = datetime.nowUnixTimestampSec()
    <%= lowerCamelClassName %>.createdAt = now
    <%= lowerCamelClassName %>.updatedAt = now
    const entity = await this.<%= lowerCamelClassName %>Repository.save(<%= lowerCamelClassName %>).catch(_ => {
      throw new InternalServerErrorException(`<%= className %> creation failed`)
    })
    return marshaller.entityToRequest(entity)
  }

  async get({ id }: PublicGet<%= className %>RequestParam): Promise<<%= className %>Response> {
    return this.<%= lowerCamelClassName %>Repository
      .findOneOrFail({ where: { id, deletedAt: IsNull() } })
      .then(e => ({ ...e }))
      .catch(e => {
        this.logger.error(e)
        throw new NotFoundException(`<%= className %> not found. id: ${id}`)
      })
  }

  async update(id: PublicUpdate<%= className %>RequestParam['id'], param: PublicUpdate<%= className %>RequestBody) {
    const <%= lowerCamelClassName %> = await this.<%= lowerCamelClassName %>Repository.findOneOrFail({ where: { id, deletedAt: IsNull() } }).catch(_ => {
      throw new NotFoundException(`<%= className %> not found. id=${id}`)
    })
<% for (const column of columns) { -%>
    if (param.<%= column %>) <%= lowerCamelClassName %>.<%= column %> = param.<%= column %>;
<% } -%>
    <%= lowerCamelClassName %>.updatedAt = datetime.nowUnixTimestampSec()
    return this.<%= lowerCamelClassName %>Repository.save(<%= lowerCamelClassName %>)
  }

  async delete(id: PublicDelete<%= className %>RequestParam['id']) {
    await this.<%= lowerCamelClassName %>Repository.findOneOrFail({ where: { id, deletedAt: IsNull() } }).catch(_ => {
      throw new NotFoundException(`<%= className %> not found. id=${id}`)
    })
    await this.<%= lowerCamelClassName %>Repository.delete(id)
  }
}

