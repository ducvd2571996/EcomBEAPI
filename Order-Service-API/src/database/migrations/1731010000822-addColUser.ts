import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColUser1731010000822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE pos_order
        ADD COLUMN address VARCHAR(255) NULL,
        ADD COLUMN email VARCHAR(100) NULL,
        ADD COLUMN sdt VARCHAR(20) NULL,
        ADD COLUMN name VARCHAR(100) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE pos_order
        DROP COLUMN address,
        DROP COLUMN email,
        DROP COLUMN sdt,
        DROP COLUMN name
    `);
  }
}
