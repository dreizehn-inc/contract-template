import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

import { Signature } from './signature.base.request'
import { Pagination, PaginationQuery } from '../base/base.request'

// GET /signatures
export abstract class PublicListSignaturesRequestQuery extends PaginationQuery {}

export abstract class PublicListSignaturesResponse {
  @ApiProperty({ type: Signature, isArray: true, required: true })
  signatures: Signature[]

  @ApiProperty({ type: Pagination, required: true })
  pagination: Pagination
}

// POST /signatures
export abstract class PublicCreateSignatureRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  sign: string

  @ApiProperty({ required: true })
  @IsNumber()
  deadline: number

  @ApiProperty({ required: true })
  @IsNumber()
  tokenId: number

  @ApiProperty({ required: true })
  @IsNumber()
  chainId: number

  @ApiProperty({ required: true })
  @IsNumber()
  nonce: number

  @ApiProperty({ required: true })
  @IsString()
  address: string
}
export abstract class PublicCreateSignatureResponse {
  @ApiProperty({ type: Signature })
  signature: Signature
}

// DELETE /signatures/{id}
export abstract class PublicDeleteSignatureRequestParam {
  @ApiProperty({ required: true })
  @IsString()
  id: string
}
