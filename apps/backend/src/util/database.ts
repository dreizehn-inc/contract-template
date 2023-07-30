import { ConflictException, InternalServerErrorException } from '@nestjs/common'

import { DB_ERROR_CODE } from '../database/database.constant'

export class DBException extends Error {
  constructor(err: any) {
    super(err)

    if (isDbError(err) && err.code === DB_ERROR_CODE.CONFLICT) {
      throw new ConflictException(err.sqlMessage)
    } else {
      throw new InternalServerErrorException(err)
    }
  }
}

interface DbError {
  code: string
  sqlMessage: string
}

const isDbError = (err: any): err is DbError =>
  !((err.code === undefined || err.code === null) && (err.sqlMessage === undefined || err.sqlMessage === null))
