import { DatabaseType, DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import * as dotenv from 'dotenv';

dotenv.config();
const configuration = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: 5432,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB_NAME,
};

const dataSourceOptions = {
  type: 'postgres' as DatabaseType,
  host: configuration.host,
  port: configuration.port,
  username: configuration.username,
  password: configuration.password,
  database: configuration.database,
  entities: ['./src/database/entities/*{.ts,.js}'],
  charset: 'utf8mb4',
  logging: true,
  migrations: ['./src/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/database/migrations',
  },
  autoLoadEntities: true,
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceOptions);
