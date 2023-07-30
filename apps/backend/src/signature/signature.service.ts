import { ConflictException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, IsNull } from 'typeorm'

import { Signature as SignatureResponse } from './signature.base.request'
import { Signature, SignatureRepository } from './signature.entity'
import * as marshaller from './signature.marshaller'
import {
  PublicCreateSignatureRequestBody,
  PublicDeleteSignatureRequestParam,
  PublicListSignaturesRequestQuery,
  PublicListSignaturesResponse
} from './signature.request'
import { DB_ERROR_CODE } from '../database/database.constant'
import { User, UserRepository } from '../user/user.entity'
import { calcPaginationParam, datetime, uid } from '../util'

@Injectable()
export class SignatureService {
  private readonly logger = new Logger()
  constructor(
    @InjectRepository(Signature)
    private signatureRepository: SignatureRepository,
    @InjectRepository(User)
    private userRepository: UserRepository
  ) {}

  async list(param: PublicListSignaturesRequestQuery): Promise<{
    signatures: PublicListSignaturesResponse['signatures']
    ttlCnt: number
  }> {
    const { skip, take } = calcPaginationParam(param.page, param.perPage)
    const where: FindManyOptions<Signature>['where'] = {
      deletedAt: IsNull()
    }
    const entities = await this.signatureRepository.find({ where, skip, take }).catch(e => {
      this.logger.error(e)
      throw new NotFoundException(`Signature not found.`)
    })
    const ttlCnt = await this.signatureRepository.count({ where })
    return { signatures: marshaller.entitiesToRequests(entities), ttlCnt }
  }

  async create(param: PublicCreateSignatureRequestBody): Promise<SignatureResponse> {
    const signature = new Signature()
    signature.id = uid.new()
    const user = await this.userRepository.findOneOrFail({ where: { id: param.address } }).catch(e => {
      console.error(e)
      throw new NotFoundException(`User not found. address=${param.address}`)
    })
    signature.user = user
    signature.sign = param.sign
    signature.deadline = param.deadline
    signature.tokenId = param.tokenId
    signature.chainId = param.chainId
    signature.nonce = param.nonce
    const now = datetime.nowUnixTimestampSec()
    signature.createdAt = now
    signature.updatedAt = now
    const entity = await this.signatureRepository.save(signature).catch(e => {
      console.error(e)
      if (e.code === DB_ERROR_CODE.CONFLICT) {
        throw new ConflictException(`Signature creation failed. That Email is already in use.`)
      }
      throw new InternalServerErrorException(`Signature creation failed`)
    })
    return marshaller.entityToRequest(entity)
  }

  async delete({ id }: PublicDeleteSignatureRequestParam) {
    await this.signatureRepository
      .findOneOrFail({
        where: { id, deletedAt: IsNull() }
      })
      .catch(_ => {
        throw new NotFoundException(`Signature not found. id=${id}`)
      })
    await this.signatureRepository.delete(id)
  }
}
