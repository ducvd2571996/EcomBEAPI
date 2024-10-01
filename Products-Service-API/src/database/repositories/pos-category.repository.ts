import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PosCategoryEntity } from '../entities';
import { CreateCategoryPayloadDTO } from 'src/modules/products/dto/request/category.request.dto';

@Injectable()
export class PosCategoryRepository {
  constructor(
    @InjectRepository(PosCategoryEntity)
    private readonly posCategoryEntity: Repository<PosCategoryEntity>,
  ) {}

  async getListOfCategory(): Promise<PosCategoryEntity[]> {
    const items = await this.posCategoryEntity.createQueryBuilder('pos_category').getMany();
    return items;
  }

  async updateCategory(data: any): Promise<any> {
    return await this.posCategoryEntity.update({ id: data?.id }, { ...data, updatedAt: new Date() });
  }

  async createCategory(data: CreateCategoryPayloadDTO): Promise<any> {
    const existingItem = await this.posCategoryEntity.findOneBy({ name: data?.name });
    if (existingItem) {
      return { success: false };
    }
    const category = this.posCategoryEntity.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    const res = await this.posCategoryEntity.insert(category);
    return { ...res, success: true };
  }
}
