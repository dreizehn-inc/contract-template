import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1680963169422 implements MigrationInterface {
  name = 'Init1680963169422'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" integer NOT NULL, "updated_at" integer NOT NULL, "deleted_at" integer, "id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "signatures" ("created_at" integer NOT NULL, "updated_at" integer NOT NULL, "deleted_at" integer, "id" character varying NOT NULL, "sign" character varying NOT NULL, "address" character varying NOT NULL, "user_id" character varying, CONSTRAINT "PK_f56eb3cd344ce7f9ae28ce814eb" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "signatures" ADD CONSTRAINT "fk_signatures_users_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "signatures" DROP CONSTRAINT "fk_signatures_users_user_id"`)
    await queryRunner.query(`DROP TABLE "signatures"`)
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
