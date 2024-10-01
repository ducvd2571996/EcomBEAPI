import { MigrationInterface, QueryRunner } from 'typeorm';

export class PosProductCategory1714402797272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE product_category (
        product_id INTEGER REFERENCES pos_product(id),
        category_id INTEGER REFERENCES pos_category(id),
        PRIMARY KEY (product_id, category_id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE product_category`);
  }
}
