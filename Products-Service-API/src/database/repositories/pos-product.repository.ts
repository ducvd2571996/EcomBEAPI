import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PosCategoryEntity, PosProductCategoryEntity, PosProductEntity } from '../entities';

@Injectable()
export class PosProductRepository {
  constructor(
    @InjectRepository(PosProductEntity)
    private readonly posProductEntity: Repository<PosProductEntity>,

    @InjectRepository(PosProductCategoryEntity)
    private readonly posProductCategoryEntity: Repository<PosProductCategoryEntity>,

    @InjectRepository(PosCategoryEntity)
    private readonly posCategoryEntity: Repository<PosCategoryEntity>,
  ) {}

  async getListOfProduct(skipCount: number, maxResultCount: number, keyword: string) {
    const queryBuilder = this.posProductEntity.createQueryBuilder('pos_product');
    if (keyword) {
      // search by keyword and filter status
      queryBuilder.andWhere('(pos_product.name ILIKE :keyword)', {
        keyword: `%${keyword}%`,
      });
    }
    const items = await queryBuilder
      .leftJoin(PosProductCategoryEntity, 'product_category', 'pos_product.id = product_category.product_id')
      .select([
        'pos_product.id as productId',
        'product_category.category_id as categoryId',
        'pos_product.name as name',
        'pos_product.description as description',
        'pos_product.tax as tax',
        'pos_product.image as image',
        'pos_product.price as price',
      ])
      .skip(+skipCount || 0)
      .take(+maxResultCount || 10)
      .orderBy('pos_product.createdAt', 'DESC')
      .getRawMany();

    for (const product of items) {
      const category = await this.posCategoryEntity.findOneBy({ id: product.categoryid });
      product.categoryName = category?.name || 'Unknown'; // Assuming 'name' is the column name for category names
      product.productId = product.productid;
      product.categoryId = product.categoryid;
      delete product.categoryid;
      delete product.productid;
    }

    const totalCount = await queryBuilder.getCount();

    return { items, totalCount };
  }

  async updateProduct(data: any): Promise<any> {
    return await this.posProductEntity.update({ id: data?.id }, { ...data, updatedAt: new Date() });
  }

  async createProduct(data: any): Promise<any> {
    const product = this.posProductEntity.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    // Check if any category with the given IDs exists
    const existingItems = await this.posCategoryEntity.find({ where: { id: In(data.categoryIds) } });

    // If not all categories are found, return { success: false }
    if (existingItems.length !== data?.categoryIds.length) {
      return { success: false };
    }

    const insertedProduct = (await this.posProductEntity.save(product)) as any;

    if (!insertedProduct) return { success: false };

    // Insert product_id and category_id into product_category for each categoryId
    await Promise.all(
      data?.categoryIds.map(async (categoryId: number) => {
        const productCategory = this.posProductCategoryEntity.create({
          product_id: insertedProduct?.id,
          category_id: categoryId,
        });
        await this.posProductCategoryEntity.insert(productCategory);
      }),
    );

    return { success: true };
  }
}
