import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PosCategoryRepository, PosProductRepository } from 'src/database/repositories';
import { CreateCategoryPayloadDTO, UpdateCategoryPayloadDTO } from '../dto/request/category.request.dto';
import {
  CreatePosProductPayloadDTO,
  GetProductListByCateIdDTO,
  GetProductListPayloadDTO,
  UpdatePosProductPayloadDTO,
} from '../dto/request/product.request.dto';
import { ProductListResDto, ProductResDto } from '../dto/response/product.reponse.dto';
import { CreateBrandPayloadDTO, UpdateBrandPayloadDTO } from '../dto/request/brand.request.dto';
import { ProductBrandRepository } from 'src/database/repositories/product-brand.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly posCategoryRepository: PosCategoryRepository,
    private readonly posProductRepository: PosProductRepository,
    private readonly productBrandRepository: ProductBrandRepository,
  ) {}

  async createCategory(dataBody: CreateCategoryPayloadDTO) {
    const result = await this.posCategoryRepository.createCategory(dataBody);
    if (!result?.success) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          code: '400',
          message: 'Category with this name already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async updateCategory(dataBody: UpdateCategoryPayloadDTO) {
    return await this.posCategoryRepository.updateCategory(dataBody);
  }

  async removeCategory(id: number) {
    return await this.posCategoryRepository.removeCategory(id);
  }

  async createBrand(dataBody: CreateBrandPayloadDTO) {
    const result = await this.productBrandRepository.createBrand(dataBody);
    if (!result?.success) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          code: '400',
          message: 'Brand with this name already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async updateBrand(dataBody: UpdateBrandPayloadDTO) {
    return await this.productBrandRepository.updateBrand(dataBody);
  }

  async deleteBrand(id: number) {
    return await this.productBrandRepository.removeBrand(id);
  }

  async createProduct(dataBody: CreatePosProductPayloadDTO) {
    return await this.posProductRepository.createProduct(dataBody);
  }

  async updateProduct(dataBody: UpdatePosProductPayloadDTO) {
    return await this.posProductRepository.updateProduct(dataBody);
  }

  async deleteProduct(id: number) {
    return await this.posProductRepository.removeProduct(id);
  }

  async getCategoryList() {
    return await this.posCategoryRepository.getListOfCategory();
  }

  async getBrandList() {
    return await this.productBrandRepository.getListOfBrand();
  }

  async getProductList(payload: GetProductListPayloadDTO): Promise<ProductListResDto> {
    const { skipCount, maxResultCount, keyword, minPrice, maxPrice, categoryId, brand } = payload;
    return await this.posProductRepository.getListOfProduct(
      skipCount,
      maxResultCount,
      keyword,
      minPrice,
      maxPrice,
      categoryId,
      brand,
    );
  }

  async getProductDetail(id: number): Promise<ProductResDto> {
    return await this.posProductRepository.getProductDetail(id);
  }

  async getProductByCateId(payload: GetProductListByCateIdDTO): Promise<ProductListResDto> {
    const { skipCount, maxResultCount, cateId } = payload;
    return await this.posProductRepository.getProductsByCategoryId(skipCount, maxResultCount, cateId);
  }

  async getLatestProduct(): Promise<ProductListResDto> {
    return await this.posProductRepository.getLatestProducts();
  }
}
