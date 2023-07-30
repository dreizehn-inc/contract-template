import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { FactoryService } from './factory.service'
import { PUBLIC_SERVICE } from '../swagger'

@ApiTags(PUBLIC_SERVICE)
@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  @Post('deploy')
  async deploy(
    @Body() param: { name: string; symbol: string; defaultUriPrefix: string; defaultUriSuffix: string }
  ): Promise<{ contractAddress: string }> {
    return await this.factoryService.deploy(param)
  }
}
