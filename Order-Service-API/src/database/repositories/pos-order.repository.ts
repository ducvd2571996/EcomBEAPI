import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PosOrderEntity } from '../entities';
import { CreateOrderPayloadDTO } from 'src/modules/pos/dto/oder.request.dto';

@Injectable()
export class PosOrderRepository {
  constructor(
    @InjectRepository(PosOrderEntity)
    private readonly posOrderEntity: Repository<PosOrderEntity>,
  ) {}

  async getOrder(id: number): Promise<PosOrderEntity> {
    return await this.posOrderEntity.findOneBy({ id });
  }

  async createOrder(data: CreateOrderPayloadDTO): Promise<any> {
    const order = this.posOrderEntity.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    const res = await this.posOrderEntity.insert(order);
    return { ...res, success: true };
  }
}
