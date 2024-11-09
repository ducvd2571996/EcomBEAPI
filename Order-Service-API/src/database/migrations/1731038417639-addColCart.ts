import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColCart1731038417639 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE pos_order
        ADD COLUMN products JSONB NULL,
        ADD COLUMN total_price DECIMAL(10, 2) NULL,
        ADD COLUMN sub_total DECIMAL(10, 2) NULL,
        ADD COLUMN discount_total DECIMAL(10, 2) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE pos_order
        DROP COLUMN products,
        DROP COLUMN total_price,
        DROP COLUMN sub_total,
        DROP COLUMN discount_total
    `);
  }
}
