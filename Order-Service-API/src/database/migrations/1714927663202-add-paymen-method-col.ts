import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymenMethodCol1714927663202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE pos_order ADD COLUMN payment_method VARCHAR(50) NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE pos_order DROP COLUMN payment_method`);
  }
}
