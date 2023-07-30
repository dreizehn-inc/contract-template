import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, IsNull } from 'typeorm'

import { User as UserResponse } from './user.base.request'
import { User, UserRepository } from './user.entity'
import * as marshaller from './user.marshaller'
import {
  PublicCreateUserRequestBody,
  PublicDeleteUserRequestParam,
  PublicListUsersRequestQuery,
  PublicListUsersResponse
} from './user.request'
import { DB_ERROR_CODE } from '../database/database.constant'
import { calcPaginationParam, datetime } from '../util'

@Injectable()
export class UserService {
  private readonly logger = new Logger()
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository
  ) {}

  async list(param: PublicListUsersRequestQuery): Promise<{
    users: PublicListUsersResponse['users']
    ttlCnt: number
  }> {
    const { skip, take } = calcPaginationParam(param.page, param.perPage)
    const where: FindManyOptions<User>['where'] = {
      deletedAt: IsNull()
    }
    const entities = await this.userRepository.find({ where, skip, take }).catch(e => {
      this.logger.error(e)
      throw new NotFoundException(`User not found.`)
    })
    const ttlCnt = await this.userRepository.count({ where })
    return { users: marshaller.entitiesToRequests(entities), ttlCnt }
  }

  async create(param: PublicCreateUserRequestBody): Promise<UserResponse> {
    const user = new User()
    user.id = param.address
    user.name = param.name
    user.email = param.email
    user.password = param.password
    const now = datetime.nowUnixTimestampSec()
    user.createdAt = now
    user.updatedAt = now
    const entity = await this.userRepository.save(user).catch(e => {
      console.error(e)
      if (e.code === DB_ERROR_CODE.CONFLICT) {
        throw new ConflictException(`User creation failed. That Email is already in use.`)
      }
      throw new InternalServerErrorException(`User creation failed`)
    })
    return marshaller.entityToRequest(entity)
  }

  async delete({ id }: PublicDeleteUserRequestParam) {
    await this.userRepository
      .findOneOrFail({
        where: { id, deletedAt: IsNull() }
      })
      .catch(_ => {
        throw new NotFoundException(`User not found. id=${id}`)
      })
    await this.userRepository.delete(id)
  }
}
