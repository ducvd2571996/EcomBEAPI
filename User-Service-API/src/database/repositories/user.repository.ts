import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) {}

  async login(data: any) {
    const user = await this.userEntity.findOneBy({ name: data.userName });
    return user;
  }

  async updateUserInfo(data: any): Promise<any> {
    return await this.userEntity.update({ id: data?.id }, { ...data, updatedAt: new Date() });
  }

  async register(data: any): Promise<any> {
    const existingItem = await this.userEntity.findOneBy({ name: data?.userName });
    if (existingItem) {
      return { success: false };
    }
    const user = this.userEntity.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    const res = await this.userEntity.insert(user);
    return { ...res, success: true };
  }
}