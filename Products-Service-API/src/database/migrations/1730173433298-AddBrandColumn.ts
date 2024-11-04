import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBrandColumn1730173433298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new column "brand_id" to the "pos_product" table
    await queryRunner.query(`
      ALTER TABLE pos_product
      ADD COLUMN brand_id INTEGER DEFAULT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the "brand_id" column from the "pos_product" table
    await queryRunner.query(`
      ALTER TABLE pos_product
      DROP COLUMN brand_id;
    `);
  }
}
