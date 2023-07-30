import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

import { UnixTimestamp } from '../base/base.request'

export abstract class User extends UnixTimestamp {
  @ApiProperty({ required: true })
  @IsString()
  id: string

  @ApiProperty({ required: true })
  @IsString()
  name: string

  @ApiProperty({ required: true })
  @IsString()
  email: string
}
