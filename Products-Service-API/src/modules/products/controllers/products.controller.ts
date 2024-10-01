import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { AuthGuard } from 'src/common/guards';
import { CreateCategoryPayloadDTO } from '../dto/request/category.request.dto';
import { CreatePosProductPayloadDTO, GetProductListPayloadDTO } from '../dto/request/product.request.dto';
import { ProductsService } from '../services/products.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Products')
@Controller({
  path: `products`,
})
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @ApiProperty({
    description: 'Thêm sản phẩm',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('')
  async createProduct(@Body() dataBody: CreatePosProductPayloadDTO) {
    return await this.productService.createProduct(dataBody);
  }

  @ApiProperty({
    description: 'Danh sách sản phẩm',
    required: false,
  })
  @IsOptional()
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getProductList(@Query() payload: GetProductListPayloadDTO) {
    return await this.productService.getProductList(payload);
  }

  @ApiProperty({
    description: 'Thêm loại sản phẩm',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/categories/create')
  async createCategory(@Body() dataBody: CreateCategoryPayloadDTO) {
    return await this.productService.createCategory(dataBody);
  }

  @ApiProperty({
    description: 'Danh sách loại sản phẩm',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/categories/get-all')
  async getCategoryList() {
    return await this.productService.getCategoryList();
  }
}
