import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { CartEntity } from 'src/database/entities';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: process.env.PG_HOST,
      port: 5432,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB_NAME,
      synchronize: false, // process.env.NODE_ENV !== 'PROD', // Dot not turn on synchronize
      logging: false,
      extra: {
        trustServerCertificate: true,
      },
      autoLoadEntities: false,
      entities: [CartEntity],
    };
  }
}
