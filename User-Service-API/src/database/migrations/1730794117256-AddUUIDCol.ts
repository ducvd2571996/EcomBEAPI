import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUUIDCol1730794117256 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add the new column "user_id" to the "pos_user" table
    await queryRunner.query(`
      ALTER TABLE pos_user
      ADD COLUMN user_id UUID DEFAULT uuid_generate_v4() UNIQUE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the "user_id" column from the "pos_user" table
    await queryRunner.query(`
      ALTER TABLE pos_user
      DROP COLUMN user_id
    `);
  }
}
