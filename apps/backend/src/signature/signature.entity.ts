import { Entity, Column, PrimaryColumn, Repository, ManyToOne, JoinColumn } from 'typeorm'

import { BaseEntity } from '../base/base.entity'
import { User } from '../user/user.entity'

@Entity({ name: 'signatures' })
export class Signature extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  tokenId: number

  @Column()
  chainId: number

  @Column()
  sign: string

  @Column()
  deadline: number

  @Column()
  nonce: number

  @ManyToOne(() => User, user => user.signatures, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User
}

export class SignatureRepository extends Repository<Signature> {}
