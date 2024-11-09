import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from 'src/common/decorators';
import { CreateUserPayloadDTO } from '../dto/request/create-user-request.dto';
import { UserLoginPayloadDTO } from '../dto/request/login.request.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/common/guards';
import { UpdateUserPayloadDTO } from '../dto/request/update-user.request';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('User')
@Controller({
  path: `users`,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiProperty({
    description: 'Đăng ký',
  })
  @ApiOperation({})
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async userRegitser(@Body() dataBody: CreateUserPayloadDTO) {
    return await this.userService.register(dataBody);
  }

  @ApiProperty({
    description: 'Cập nhật',
  })
  @ApiOperation({})
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Put('/update')
  async update(@Body() dataBody: UpdateUserPayloadDTO) {
    return await this.userService.updateUser(dataBody);
  }

  @ApiProperty({
    description: 'Đăng nhập',
  })
  @ApiOperation({})
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async userLogin(@Body() dataBody: UserLoginPayloadDTO) {
    return await this.userService.login(dataBody);
  }

  @ApiProperty({
    description: 'Lấy thông tin khách hàng bằng ID',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @ApiProperty({
    description: 'Lấy ds khách hàng',
  })
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Get('/get-users/all')
  async getListUser() {
    return await this.userService.getListUser();
  }
}
