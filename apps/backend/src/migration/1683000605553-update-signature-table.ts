import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateSignatureTable1683000605553 implements MigrationInterface {
  name = 'UpdateSignatureTable1683000605553'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "signatures" DROP COLUMN "address"`)
    await queryRunner.query(`ALTER TABLE "signatures" ADD "tokenId" integer NOT NULL`)
    await queryRunner.query(`ALTER TABLE "signatures" ADD "chainId" integer NOT NULL`)
    await queryRunner.query(`ALTER TABLE "signatures" ADD "deadline" integer NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "signatures" DROP COLUMN "deadline"`)
    await queryRunner.query(`ALTER TABLE "signatures" DROP COLUMN "chainId"`)
    await queryRunner.query(`ALTER TABLE "signatures" DROP COLUMN "tokenId"`)
    await queryRunner.query(`ALTER TABLE "signatures" ADD "address" character varying NOT NULL`)
  }
}
