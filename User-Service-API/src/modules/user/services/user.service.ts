import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserPayloadDTO } from '../dto/request/create-user-request.dto';
import { UserRepository } from 'src/database/repositories';
import { UserLoginPayloadDTO } from '../dto/request/login.request.dto';
import { generateToken } from 'src/shared/utils';
import { IUser } from 'src/shared/interfaces';
import { UserInfo, UserLoginResDto } from '../dto/response/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(dataBody: CreateUserPayloadDTO) {
    const result = await this.userRepository.register(dataBody);
    if (!result?.success) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          code: '400',
          message: 'User with this UserName already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async updateUser(data: CreateUserPayloadDTO) {
    const result = await this.userRepository.updateUserInfo(data);

    if (result?.affected === 0) {
      // No rows were updated because the criteria didn't match any rows
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          code: '400',
          message: 'User was not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return result;
    }
  }

  async login(user: UserLoginPayloadDTO): Promise<UserLoginResDto> {
    const result = await this.userRepository.login(user);

    // Check if user exists and password is correct
    if (!result || result.password !== user.password) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const userForToken: IUser = {
      name: result.name,
      phone_number: result.phoneNumber,
      email: result.email,
    };

    const userInfo: UserInfo = {
      id: result.id,
      name: result.name,
      phoneNumber: result.phoneNumber,
      email: result.email,
      updatedAt: result.updatedAt,
      createdAt: result.createdAt,
    };

    const token = generateToken(userForToken);

    return { userInfo, token };
  }
}
