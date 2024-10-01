import { MigrationInterface, QueryRunner } from 'typeorm';

export class PosOrder1714401654466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE pos_order (
                id SERIAL PRIMARY KEY,
                customer_id INTEGER,
                cart_id INTEGER,
                order_status VARCHAR(50),  
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pos_order`);
  }
}
