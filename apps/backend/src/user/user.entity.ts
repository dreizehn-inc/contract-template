import { Entity, Column, PrimaryColumn, Repository, Unique, OneToMany } from 'typeorm'

import { BaseEntity } from '../base/base.entity'
import { Signature } from '../signature/signature.entity'

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @OneToMany(() => Signature, Signature => Signature.user)
  signatures: Signature[]
}

export class UserRepository extends Repository<User> {}
