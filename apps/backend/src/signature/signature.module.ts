import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SignatureController } from './signature.controller'
import { Signature } from './signature.entity'
import { SignatureService } from './signature.service'
import { User } from '../user/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Signature, User])],
  controllers: [SignatureController],
  providers: [SignatureService]
})
export class SignatureModule {}
