import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { UnixTimestamp } from '../base/base.request'

export abstract class Transaction extends UnixTimestamp {
  @ApiProperty({ required: true })
  @IsString()
  id: string

  @ApiProperty({ required: true })
  @IsString()
  hash: string

  @ApiProperty({ required: true })
  @IsString()
  status: string
}
