import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PosCategoryEntity, PosProductCategoryEntity, PosProductEntity } from 'src/database/entities';
import { PosCategoryRepository, PosProductRepository } from 'src/database/repositories';
import { ProductController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { ProductBrandRepository } from 'src/database/repositories/product-brand.repository';
import { ProductBrandEntity } from 'src/database/entities/product-brand.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductsService, PosProductRepository, PosCategoryRepository, ProductBrandRepository],
  imports: [
    TypeOrmModule.forFeature([PosProductEntity, PosCategoryEntity, PosProductCategoryEntity, ProductBrandEntity]),
  ],
})
export class ProductsModule {}
