import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { GreeterService } from './greeter.service'
import { PUBLIC_SERVICE } from '../swagger'

@ApiTags(PUBLIC_SERVICE)
@Controller('greeter')
export class GreeterController {
  constructor(private readonly greeterService: GreeterService) {}

  @Get()
  async get(): Promise<{ greeting: string }> {
    return await this.greeterService.greet()
  }

  @Post()
  async create(@Body('greeting') newGreeting: string): Promise<{ greeting: string }> {
    return await this.greeterService.create(newGreeting)
  }

  @Get(':hash')
  async getTransactionConfirmations(@Param('hash') transactionHash: string): Promise<number> {
    return await this.greeterService.getTransactionConfirmations(transactionHash)
  }
}
