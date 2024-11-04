import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDiscountRateColumn1729754725040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new column "discount_rate" to the "pos_product" table
    await queryRunner.query(`
      ALTER TABLE pos_product
      ADD COLUMN discount_rate INTEGER DEFAULT 0;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the "discount_rate" column from the "pos_product" table
    await queryRunner.query(`
      ALTER TABLE pos_product
      DROP COLUMN discount_rate;
    `);
  }
}
