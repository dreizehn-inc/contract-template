import {
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common'
import { AxiosError } from 'axios'

export const isAxiosError = (error: any): error is AxiosError => {
  return !!error.isAxiosError
}

export const throwAxiosError = (e: AxiosError, message?: string) => {
  const res = e.response
  const status = res?.status
  const error = new Error(message || 'error が発生しました')
  if (status === HttpStatus.BAD_REQUEST) throw new BadRequestException(error)
  if (status === HttpStatus.UNAUTHORIZED) throw new UnauthorizedException(error)
  if (status === HttpStatus.FORBIDDEN) throw new ForbiddenException(error)
  if (status === HttpStatus.NOT_FOUND) throw new NotFoundException(error)
  if (status === HttpStatus.UNPROCESSABLE_ENTITY) throw new UnprocessableEntityException(error)
}
