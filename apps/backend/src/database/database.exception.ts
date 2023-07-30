import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { EntityNotFoundError } from 'typeorm'

import { DB_ERROR_CODE } from './database.constant'

export class DBException extends Error {
  constructor(err: any) {
    super(err)

    if (isDbError(err) && isConflictError(err)) {
      throw new ConflictException(err.detail)
    } else if (isEntityNotFoundError(err)) {
      throw new NotFoundException(err.message)
    } else {
      throw new InternalServerErrorException(err)
    }
  }
}

export interface DbError {
  code: string
  sqlMessage: string
  detail: string
}

const isDbError = (err: any): err is DbError =>
  !(
    (err.code === undefined || err.code === null) &&
    (err.sqlMessage === undefined || err.sqlMessage === null) &&
    (err.detail === undefined || err.detail === null)
  )

const isConflictError = (err: any): err is DbError => err.code === DB_ERROR_CODE.CONFLICT

const isEntityNotFoundError = (err: any): err is EntityNotFoundError => err.name && err.name === 'EntityNotFoundError'
