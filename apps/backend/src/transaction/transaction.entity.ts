import { Entity, Column, PrimaryColumn, Repository } from 'typeorm'

import { BaseEntity } from '../base/base.entity'

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  hash: string

  @Column()
  status: string // 'IN_PROGRESS' | 'CONFIRMED' | 'FAILED'
}

export class TransactionRepository extends Repository<Transaction> {}
