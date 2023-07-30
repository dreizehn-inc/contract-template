import { Controller, Get, Query, Post, Body, Delete, Param } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from '@nestjs/swagger'

import {
  PublicCreateSignatureRequestBody,
  PublicCreateSignatureResponse,
  PublicDeleteSignatureRequestParam,
  PublicListSignaturesRequestQuery,
  PublicListSignaturesResponse
} from './signature.request'
import { SignatureService } from './signature.service'
import { newPagination } from '../pagination'
import { PUBLIC_SERVICE } from '../swagger'

@ApiTags(PUBLIC_SERVICE)
@Controller('signatures')
export class SignatureController {
  constructor(private readonly signatureService: SignatureService) {}

  @ApiOperation({ summary: '署名一覧を取得' })
  @ApiOkResponse({ type: PublicListSignaturesResponse })
  @Get()
  async list(@Query() param: PublicListSignaturesRequestQuery): Promise<PublicListSignaturesResponse> {
    const { signatures, ttlCnt } = await this.signatureService.list(param)
    const pagination = newPagination({ page: param.page, perPage: param.perPage, ttlCnt })
    return { signatures, pagination }
  }

  @ApiOperation({ summary: '署名を新規作成' })
  @ApiCreatedResponse({ type: PublicCreateSignatureResponse })
  @Post()
  async create(@Body() param: PublicCreateSignatureRequestBody): Promise<PublicCreateSignatureResponse> {
    return { signature: await this.signatureService.create(param) }
  }

  @ApiOperation({ summary: '署名の削除' })
  @ApiNoContentResponse()
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  async delete(@Param('id') id: PublicDeleteSignatureRequestParam['id']): Promise<null> {
    await this.signatureService.delete({ id })
    return null
  }
}
