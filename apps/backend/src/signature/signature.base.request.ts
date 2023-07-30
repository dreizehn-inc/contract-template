import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

import { UnixTimestamp } from '../base/base.request'

export abstract class Signature extends UnixTimestamp {
  @ApiProperty({ required: true })
  @IsString()
  id: string

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
}
