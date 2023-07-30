import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AppService } from './app.service'

@ApiTags('Ping')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Ping', description: '動作確認用です。' })
  @ApiOkResponse()
  @Get('ping')
  async get(): Promise<string> {
    return 'pong'
  }

  @ApiOperation({ summary: 'Health', description: 'ヘルスチェック用です。' })
  @ApiOkResponse()
  @Get('health')
  async health(): Promise<string> {
    return await this.appService.health()
  }
}
