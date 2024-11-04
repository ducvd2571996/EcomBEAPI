import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPassword1730711356928 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new columns "customer_uuid" and "password" to the "pos_customer" table
    await queryRunner.query(`
      ALTER TABLE pos_customer
      ADD COLUMN password VARCHAR(255) NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the "customer_uuid" and "password" columns from the "pos_customer" table
    await queryRunner.query(`
      ALTER TABLE pos_customer
      DROP COLUMN password
    `);
  }
}
