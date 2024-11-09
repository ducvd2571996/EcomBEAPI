import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards';
import { CreateCartDTO, RemoveItemFromCartDto, UpdateCartDTO } from '../dto/request/cart.request.dto';
import { CartService } from '../services/cart.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Cart')
@Controller({
  path: `carts`,
})
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiProperty({
    description: 'Thêm giỏ hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('')
  async createCart(@Body() dataBody: CreateCartDTO) {
    return await this.cartService.createCart(dataBody);
  }

  @ApiProperty({
    description: 'Lấy giỏ hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getCart(@Param('id') id: number) {
    return await this.cartService.getCart(id);
  }

  @ApiProperty({
    description: 'Cập nhật giỏ hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Put('')
  async updateCart(@Body() dataBody: UpdateCartDTO) {
    return await this.cartService.updateCart(dataBody);
  }

  @ApiProperty({
    description: 'Xoá sản phẩm khỏi giỏ hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/remove-item')
  async removeCartItem(@Body() dataBody: RemoveItemFromCartDto) {
    return await this.cartService.removeItemFromCart(dataBody);
  }

  @ApiProperty({
    description: 'Xoá giỏ hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async removeFromCart(@Param('id') id: number) {
    return await this.cartService.removeCart(id);
  }
}
