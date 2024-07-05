import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1697983269218 implements MigrationInterface {
  name = 'Migrations1697983269218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "items" ("id" SERIAL NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "items"`);
  }
}
