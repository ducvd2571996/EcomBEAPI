import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Public } from 'src/common/decorators';
import { AuthGuard } from 'src/common/guards';
import { CreateCategoryPayloadDTO, UpdateCategoryPayloadDTO } from '../dto/request/category.request.dto';
import {
  CreatePosProductPayloadDTO,
  GetProductListByCateIdDTO,
  GetProductListPayloadDTO,
  UpdatePosProductPayloadDTO,
} from '../dto/request/product.request.dto';
import { ProductsService } from '../services/products.service';
import { CreateBrandPayloadDTO, UpdateBrandPayloadDTO } from '../dto/request/brand.request.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Products')
@Controller({
  path: `products`,
})
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Public()
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

  @Public()
  @ApiProperty({
    description: 'Cập nhật sản phẩm',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Put('')
  async updateProduct(@Body() dataBody: UpdatePosProductPayloadDTO) {
    return await this.productService.updateProduct(dataBody);
  }

  @Public()
  @ApiProperty({
    description: 'Xoá sản phẩm',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete-by-id/:id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productService.deleteProduct(id);
  }

  @Public()
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

  @Public()
  @ApiProperty({
    description: 'Danh sách sản phẩm mới nhất',
    required: false,
  })
  @IsOptional()
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/latest')
  async getLatestProducts() {
    return await this.productService.getLatestProduct();
  }

  @Public()
  @ApiOperation({ summary: 'Get products by category ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product list retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/get-by-category-id')
  async getProductListByCategoryId(@Query() payload: GetProductListByCateIdDTO) {
    return await this.productService.getProductByCateId(payload);
  }

  @Public()
  @ApiOperation({ summary: 'Get products by category ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product list retrieved successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getProductDetail(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.getProductDetail(id);
  }

  @Public()
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
  @Public()
  @ApiProperty({
    description: 'Cập nhật loại sản phẩm',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/categories/update')
  async updateCate(@Body() dataBody: UpdateCategoryPayloadDTO) {
    return await this.productService.updateCategory(dataBody);
  }

  @Public()
  @ApiProperty({
    description: 'Xoá loại sản phẩm',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/categories/delete/:id')
  async deleteCate(@Param('id') id: number) {
    return await this.productService.removeCategory(id);
  }

  @Public()
  @ApiProperty({
    description: 'Thêm brand',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/brands/create')
  async createBrand(@Body() dataBody: CreateBrandPayloadDTO) {
    return await this.productService.createBrand(dataBody);
  }

  @Public()
  @ApiProperty({
    description: 'Cập nhật brand',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/brands/update')
  async updateBrand(@Body() dataBody: UpdateBrandPayloadDTO) {
    return await this.productService.updateBrand(dataBody);
  }

  @Public()
  @ApiProperty({
    description: 'Xoá Thương hiệu',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/brands/delete/:id')
  async deleteBrand(@Param('id') id: number) {
    return await this.productService.deleteBrand(id);
  }

  @Public()
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

  @Public()
  @ApiProperty({
    description: 'Danh sách brand',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/brands/get-all')
  async getBrands() {
    return await this.productService.getBrandList();
  }
}
