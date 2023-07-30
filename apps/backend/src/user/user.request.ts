import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { User } from './user.base.request'
import { Pagination, PaginationQuery } from '../base/base.request'

// GET /users
export abstract class PublicListUsersRequestQuery extends PaginationQuery {}

export abstract class PublicListUsersResponse {
  @ApiProperty({ type: User, isArray: true, required: true })
  users: User[]

  @ApiProperty({ type: Pagination, required: true })
  pagination: Pagination
}

// POST /users
export abstract class PublicCreateUserRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  address: string

  @ApiProperty({ required: true })
  @IsString()
  name: string

  @ApiProperty({ required: true })
  @IsString()
  email: string

  @ApiProperty({ required: true })
  @IsString()
  password: string
}
export abstract class PublicCreateUserResponse {
  @ApiProperty({ type: User })
  user: User
}

// DELETE /users/{id}
export abstract class PublicDeleteUserRequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}
