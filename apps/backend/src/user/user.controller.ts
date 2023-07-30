import { Controller, Get, Query, Post, Body, Delete, Param } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger'

import {
  PublicCreateUserRequestBody,
  PublicCreateUserResponse,
  PublicDeleteUserRequestParam,
  PublicListUsersRequestQuery,
  PublicListUsersResponse
} from './user.request'
import { UserService } from './user.service'
import { newPagination } from '../pagination'
import { PUBLIC_SERVICE } from '../swagger'

@ApiTags(PUBLIC_SERVICE)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'ユーザー一覧を取得' })
  @ApiOkResponse({ type: PublicListUsersResponse })
  @Get()
  async list(@Query() param: PublicListUsersRequestQuery): Promise<PublicListUsersResponse> {
    const { users, ttlCnt } = await this.userService.list(param)
    const pagination = newPagination({ page: param.page, perPage: param.perPage, ttlCnt })
    return { users, pagination }
  }

  @ApiOperation({ summary: 'ユーザーを新規作成' })
  @ApiCreatedResponse({ type: PublicCreateUserResponse })
  @Post()
  async create(@Body() param: PublicCreateUserRequestBody): Promise<PublicCreateUserResponse> {
    return { user: await this.userService.create(param) }
  }

  @ApiOperation({ summary: 'ユーザーの削除' })
  @ApiNoContentResponse()
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  async delete(@Param('id') id: PublicDeleteUserRequestParam['id']): Promise<null> {
    await this.userService.delete({ id })
    return null
  }
}
