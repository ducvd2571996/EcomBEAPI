import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards';
import { CreateOrderPayloadDTO } from '../dto/oder.request.dto';
import { OrderService } from '../services/order.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Order')
@Controller({
  path: `order`,
})
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiProperty({
    description: 'Thêm đơn hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('')
  async createOrder(@Body() dataBody: CreateOrderPayloadDTO) {
    return await this.orderService.create(dataBody);
  }

  @ApiProperty({
    description: 'Lấy đơn hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getOrder(@Param('id') id: number) {
    return await this.orderService.get(id);
  }
}
