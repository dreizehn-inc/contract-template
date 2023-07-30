import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { dataSource } from '../type-orm.option'

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options)],
  providers: [],
  exports: []
})
export class DatabaseModule {}
