import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PosCategoryEntity, PosProductCategoryEntity, PosProductEntity } from '../entities';
import {
  CreateCategoryPayloadDTO,
  UpdateCategoryPayloadDTO,
} from 'src/modules/products/dto/request/category.request.dto';

@Injectable()
export class PosCategoryRepository {
  constructor(
    @InjectRepository(PosCategoryEntity)
    private readonly posCategoryEntity: Repository<PosCategoryEntity>,

    @InjectRepository(PosProductEntity)
    private readonly posProductEntity: Repository<PosProductEntity>,

    @InjectRepository(PosProductCategoryEntity)
    private readonly posProductCategoryEntity: Repository<PosProductCategoryEntity>,
  ) {}

  async getListOfCategory(): Promise<PosCategoryEntity[]> {
    const categoryCounts = await this.posCategoryEntity
      .createQueryBuilder('category')
      .leftJoin(PosProductCategoryEntity, 'product_category', 'category.id = product_category.category_id')
      .leftJoin(PosProductEntity, 'pos_product', 'pos_product.id = product_category.product_id')
      .select('category.id', 'categoryId')
      .addSelect('category.name', 'categoryName')
      .addSelect('category.image', 'categoryImage') // Make sure 'image' is the correct column name in the database
      .addSelect('COUNT(pos_product.id)', 'productCount')
      .groupBy('category.id')
      .addGroupBy('category.name')
      .orderBy('category.created_at', 'DESC')
      .getRawMany();

    return categoryCounts.map(
      (category) =>
        ({
          id: category.categoryId,
          name: category.categoryName,
          image: category.categoryImage || null, // Make sure to map it correctly
          productCount: parseInt(category.productCount, 10) || 0, // Ensure 0 for categories with no products
        } as any),
    );
  }

  async updateCategory(data: UpdateCategoryPayloadDTO): Promise<any> {
    return await this.posCategoryEntity.update({ id: data?.id }, { ...data, updatedAt: new Date() });
  }

  async removeCategory(id: number): Promise<any> {
    await this.posProductCategoryEntity.delete({ category_id: id });
    return await this.posCategoryEntity.delete({ id });
  }

  async createCategory(data: CreateCategoryPayloadDTO): Promise<any> {
    const existingItem = await this.posCategoryEntity.findOneBy({ name: data?.name });
    if (existingItem) {
      return { success: false };
    }
    const category = this.posCategoryEntity.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    const res = await this.posCategoryEntity.insert(category);
    return { ...res, success: true };
  }
}
