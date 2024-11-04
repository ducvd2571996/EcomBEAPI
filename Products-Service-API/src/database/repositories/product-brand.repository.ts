import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBrandPayloadDTO } from 'src/modules/products/dto/request/brand.request.dto';
import { ProductBrandEntity } from '../entities/product-brand.entity';
import { PosProductEntity } from '../entities';

@Injectable()
export class ProductBrandRepository {
  constructor(
    @InjectRepository(ProductBrandEntity)
    private readonly productBrandEntity: Repository<ProductBrandEntity>,
    @InjectRepository(PosProductEntity)
    private readonly posProductEntity: Repository<PosProductEntity>,
  ) {}

  async getListOfBrand(): Promise<ProductBrandEntity[]> {
    const items = await this.productBrandEntity.createQueryBuilder('product_brand').getMany();
    // Query all brands with their product counts in one query using GROUP BY
    const brandCounts = await this.posProductEntity
      .createQueryBuilder('pos_product')
      .select('pos_product.brand', 'brand')
      .addSelect('COUNT(pos_product.id)', 'productCount')
      .groupBy('pos_product.brand')
      .getRawMany();

    // Map the count results to the provided brands array
    const formattedBrands = items.map((brand) => {
      const countData = brandCounts.find((bc) => bc.brand === brand.id);
      return {
        ...brand,
        productCount: countData ? parseInt(countData.productCount, 10) : 0,
      };
    });

    return formattedBrands;
  }

  async updateBrand(data: any): Promise<any> {
    return await this.productBrandEntity.update({ id: data?.id }, { ...data, updatedAt: new Date() });
  }

  async createBrand(data: CreateBrandPayloadDTO): Promise<any> {
    const existingItem = await this.productBrandEntity.findOneBy({ name: data?.name });
    if (existingItem) {
      return { success: false };
    }
    const brand = this.productBrandEntity.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    const res = await this.productBrandEntity.insert(brand);
    return { ...res, success: true };
  }
}
