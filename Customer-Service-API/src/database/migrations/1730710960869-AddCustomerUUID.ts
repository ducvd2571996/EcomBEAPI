import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCustomerUUID1730710960869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new column "customer_uuid" to the "pos_customer" table
    await queryRunner.query(`
      ALTER TABLE pos_customer
      ADD COLUMN customer_uuid UUID DEFAULT uuid_generate_v4() UNIQUE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the "customer_uuid" column from the "pos_customer" table
    await queryRunner.query(`
      ALTER TABLE pos_customer
      DROP COLUMN customer_uuid
    `);
  }
}
