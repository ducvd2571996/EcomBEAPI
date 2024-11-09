import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { AuthGuard } from 'src/common/guards';
import { CreateOrderPayloadDTO } from '../dto/oder.request.dto';
import { POSService } from '../services/pos.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('POS')
@Controller({
  path: `pos`,
})
export class POSController {
  constructor(private readonly posService: POSService) {}

  @ApiProperty({
    description: 'Thêm đơn hàng',
  })
  @ApiOperation({})
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/orders')
  async createOrder(@Body() dataBody: CreateOrderPayloadDTO) {
    return await this.posService.create(dataBody);
  }

  @ApiProperty({
    description: 'Lấy đơn hàng',
  })
  @ApiOperation({})
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/orders/:id')
  async getOrder(@Param('id') id: number) {
    return await this.posService.get(id);
  }

  @ApiProperty({
    description: 'Lấy danh sách đơn hàng',
  })
  @ApiOperation({})
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/orders/get-by-customer/:customerId')
  async getList(@Param('customerId') customerId: number) {
    return await this.posService.getListByCustomerId(customerId);
  }
}
