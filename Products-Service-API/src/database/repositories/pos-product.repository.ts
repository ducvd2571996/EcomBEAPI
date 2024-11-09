import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PosCategoryEntity, PosProductCategoryEntity, PosProductEntity } from '../entities';
import { UpdatePosProductPayloadDTO } from 'src/modules/products/dto/request/product.request.dto';

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

  async getListOfProduct(
    skipCount: number,
    maxResultCount: number,
    keyword: string,
    minPrice?: number,
    maxPrice?: number,
    categoryId?: number,
    brand?: number,
  ) {
    const queryBuilder = this.posProductEntity.createQueryBuilder('pos_product');
    if (keyword) {
      // search by keyword and filter status
      queryBuilder.andWhere('(pos_product.name ILIKE :keyword)', {
        keyword: `%${keyword}%`,
      });
    }
    queryBuilder.leftJoin(PosProductCategoryEntity, 'product_category', 'pos_product.id = product_category.product_id');
    // Filter by category
    if (categoryId) {
      queryBuilder.andWhere('product_category.category_id = :categoryId', { categoryId });
    }

    // Filter by brand
    if (brand) {
      queryBuilder.andWhere('pos_product.brand = :brand', { brand });
    }

    // Filter by price range
    if (minPrice != null) {
      queryBuilder.andWhere('pos_product.price >= :minPrice', { minPrice });
    }
    if (maxPrice != null) {
      queryBuilder.andWhere('pos_product.price <= :maxPrice', { maxPrice });
    }

    const items = await queryBuilder
      .select([
        'pos_product.id as productId',
        'product_category.category_id as categoryId',
        'pos_product.name as name',
        'pos_product.description as description',
        'pos_product.tax as tax',
        'pos_product.image as image',
        'pos_product.price as price',
        'pos_product.discount as discount',
        'pos_product.brand as brand',
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

  async getProductDetail(productId: number) {
    const queryBuilder = this.posProductEntity.createQueryBuilder('pos_product');

    const product = await queryBuilder
      .leftJoin(PosProductCategoryEntity, 'product_category', 'pos_product.id = product_category.product_id')
      .select([
        'pos_product.id as productId',
        'product_category.category_id as categoryId',
        'pos_product.name as name',
        'pos_product.description as description',
        'pos_product.tax as tax',
        'pos_product.image as image',
        'pos_product.price as price',
        'pos_product.discount as discount',
        'pos_product.brand as brand',
        'pos_product.discount_rate as discountRate', // Assuming this column was recently added
      ])
      .where('pos_product.id = :productId', { productId })
      .getRawOne();

    if (product) {
      const category = await this.posCategoryEntity.findOneBy({ id: product.categoryid });
      product.categoryName = category?.name || 'Unknown'; // Assuming 'name' is the column name for category names
      product.productId = product.productid;
      product.categoryId = product.categoryid;
      delete product.categoryid;
      delete product.productid;
    }

    return product || { message: 'Product not found' };
  }

  async getLatestProducts() {
    const queryBuilder = this.posProductEntity.createQueryBuilder('pos_product');

    const items = await queryBuilder
      .select([
        'pos_product.id as productId',
        'pos_product.name as name',
        'pos_product.description as description',
        'pos_product.tax as tax',
        'pos_product.image as image',
        'pos_product.price as price',
        'pos_product.discount as discount',
        'pos_product.brand as brand',
      ])
      .skip(0)
      .take(3)
      .orderBy('pos_product.createdAt', 'DESC')
      .getRawMany();

    for (const product of items) {
      product.productId = product.productid;
      product.categoryId = product.categoryid;
      delete product.categoryid;
      delete product.productid;
    }

    return { items };
  }

  // Separate function to filter products by categoryId
  async getProductsByCategoryId(skipCount: number, maxResultCount: number, categoryId: number) {
    const queryBuilder = this.posProductEntity.createQueryBuilder('pos_product');

    // Select relevant fields
    const items = await queryBuilder
      .leftJoin(PosProductCategoryEntity, 'product_category', 'pos_product.id = product_category.product_id')
      .andWhere('product_category.category_id = :categoryId', {
        categoryId,
      })
      .select([
        'pos_product.id as productId',
        'product_category.category_id as categoryId',
        'pos_product.name as name',
        'pos_product.description as description',
        'pos_product.tax as tax',
        'pos_product.image as image',
        'pos_product.price as price',
        'pos_product.discount as discount',
        'pos_product.brand as brand',
      ])
      .skip(+skipCount || 0)
      .take(+maxResultCount || 10)
      .orderBy('pos_product.createdAt', 'DESC')
      .getRawMany();

    // Fetch category names and format the product data
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

  async updateProduct(data: UpdatePosProductPayloadDTO): Promise<any> {
    return await this.posProductEntity.update({ id: data?.id }, { ...data, updatedAt: new Date() });
  }

  async removeProduct(productId: number): Promise<any> {
    return await this.posProductEntity.delete({ id: productId });
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
