import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from 'src/common/decorators';
import { CreateUserPayloadDTO } from '../dto/request/create-user-request.dto';
import { UserLoginPayloadDTO } from '../dto/request/login.request.dto';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/common/guards';

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
}
