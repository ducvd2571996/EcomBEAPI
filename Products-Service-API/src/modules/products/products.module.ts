import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PosCategoryEntity, PosProductCategoryEntity, PosProductEntity } from 'src/database/entities';
import { PosCategoryRepository, PosProductRepository } from 'src/database/repositories';
import { ProductController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [ProductController],
  providers: [ProductsService, PosProductRepository, PosCategoryRepository],
  imports: [TypeOrmModule.forFeature([PosProductEntity, PosCategoryEntity, PosProductCategoryEntity])],
})
export class ProductsModule {}
