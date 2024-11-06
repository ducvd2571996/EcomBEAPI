import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddressCol1730773433963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new columns "pos_customer" and "address" to the "pos_customer" table
    await queryRunner.query(`
      ALTER TABLE pos_customer
      ADD COLUMN address VARCHAR(255) NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the "pos_customer" and "address" columns from the "pos_customer" table
    await queryRunner.query(`
      ALTER TABLE pos_customer
      DROP COLUMN address
    `);
  }
}
