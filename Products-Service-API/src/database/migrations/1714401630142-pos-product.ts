import { MigrationInterface, QueryRunner } from 'typeorm';

export class PosProduct1714401630142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE pos_product (
                id SERIAL PRIMARY KEY,
                name VARCHAR(250),
                image VARCHAR(250),
                price DECIMAL(10, 2),
                description VARCHAR(250),
                tax INTEGER,    
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pos_product`);
  }
}
