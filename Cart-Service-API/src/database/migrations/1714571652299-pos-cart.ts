import { MigrationInterface, QueryRunner } from 'typeorm';

export class PosCart1714571652299 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE pos_cart (
                id SERIAL PRIMARY KEY,
                customer_id INTEGER,
                total_price DECIMAL(10, 2),
                sub_total DECIMAL(10, 2),
                products JSONB,
                coupon JSONB,
                discount_total DECIMAL(10, 2), 
                tax INTEGER,   
                note VARCHAR(250),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pos_cart`);
  }
}
