import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards';
import { CreateCustomerPayloadDTO } from '../dto/request/create-customer-request.dto';
import { CustomerService } from '../services/customer.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Customer')
@Controller({
  path: `customer`,
})
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiProperty({
    description: 'Thêm mới khách hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('')
  async createCustomer(@Body() dataBody: CreateCustomerPayloadDTO) {
    return await this.customerService.create(dataBody);
  }

  @ApiProperty({
    description: 'Lấy thông tin khách hàng bằng SDT',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('')
  async getCustomerByPhone(@Query('phoneNumber') phoneNumber: string) {
    return await this.customerService.getCustomer(phoneNumber);
  }

  @ApiProperty({
    description: 'Lấy thông tin khách hàng bằng ID',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/getById/:id')
  async getCustomerById(@Param('id') id: number) {
    return await this.customerService.getCustomerById(id);
  }
}