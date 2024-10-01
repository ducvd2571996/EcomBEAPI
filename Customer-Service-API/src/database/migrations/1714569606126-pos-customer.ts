import { MigrationInterface, QueryRunner } from 'typeorm';

export class PosCustomer1714569606126 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE pos_customer (
                id serial PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255),
                phone_number VARCHAR(255),
                created_at TIMESTAMP,
                updated_at TIMESTAMP
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE pos_customer`);
  }
}
