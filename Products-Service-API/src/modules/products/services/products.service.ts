import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryPayloadDTO } from '../dto/request/category.request.dto';
import { CreatePosProductPayloadDTO, GetProductListPayloadDTO } from '../dto/request/product.request.dto';
import { PosCategoryRepository, PosProductRepository } from 'src/database/repositories';
import { ProductListResDto } from '../dto/response/product.reponse.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly posCategoryRepository: PosCategoryRepository,
    private readonly posProductRepository: PosProductRepository,
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

  async createProduct(dataBody: CreatePosProductPayloadDTO) {
    return await this.posProductRepository.createProduct(dataBody);
  }

  async getCategoryList() {
    return await this.posCategoryRepository.getListOfCategory();
  }

  async getProductList(payload: GetProductListPayloadDTO): Promise<ProductListResDto> {
    const { skipCount, maxResultCount, keyword } = payload;
    return await this.posProductRepository.getListOfProduct(skipCount, maxResultCount, keyword);
  }
}
