import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductBrand1730173133219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE product_brand (
                id SERIAL PRIMARY KEY,
                name VARCHAR(250),
                image VARCHAR(250),   
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE product_brand`);
  }
}
