import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddressCol1730776286408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new columns "pos_user" and "address" to the "pos_user" table
    await queryRunner.query(`
      ALTER TABLE pos_user
      ADD COLUMN address VARCHAR(255) DEFAULT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the "pos_user" and "address" columns from the "pos_user" table
    await queryRunner.query(`
      ALTER TABLE pos_user
      DROP COLUMN address
    `);
  }
}