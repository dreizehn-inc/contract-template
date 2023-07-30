import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddNonceColumn1683432411595 implements MigrationInterface {
  name = 'AddNonceColumn1683432411595'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "signatures" ADD "nonce" integer NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "signatures" DROP COLUMN "nonce"`)
  }
}
