import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserPayloadDTO } from '../dto/request/create-user-request.dto';
import { UserRepository } from 'src/database/repositories';
import { UserLoginPayloadDTO } from '../dto/request/login.request.dto';
import { generateToken } from 'src/shared/utils';
import { IUser } from 'src/shared/interfaces';
import { UserInfo, UserLoginResDto } from '../dto/response/user-response.dto';
import { UpdateUserPayloadDTO } from '../dto/request/update-user.request';

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
          message: 'User with this phoneNumber already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async updateUser(data: UpdateUserPayloadDTO) {
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

  async getUserById(id: number) {
    const result = await this.userRepository.GetUserById(id);
    const userInfo: UserInfo = {
      id: result.id,
      userId: result.userId,
      name: result.name,
      phoneNumber: result.phoneNumber,
      address: result?.address,
      email: result.email,
      updatedAt: result.updatedAt,
      createdAt: result.createdAt,
    };
    return userInfo;
  }

  async getListUser() {
    const result = await this.userRepository.getListUser();
    const users = result?.map((user) => {
      const userInfo: UserInfo = {
        id: user?.id,
        userId: user?.userId,
        name: user?.name,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
        email: user?.email,
        updatedAt: user?.updatedAt,
        createdAt: user?.createdAt,
      };
      return userInfo;
    });

    return users;
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
      userId: result.userId,
      name: result.name,
      phoneNumber: result.phoneNumber,
      address: result?.address,
      role: result?.role,
      email: result.email,
      updatedAt: result.updatedAt,
      createdAt: result.createdAt,
    };

    const token = generateToken(userForToken);

    return { userInfo, token };
  }
}
