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

  async getListOrderByUserId(customerId: number): Promise<PosOrderEntity[]> {
    const queryBuilder = this.posOrderEntity.createQueryBuilder('pos_order');
    return await queryBuilder
      .where('pos_order.customer_id = :customerId', { customerId })
      .orderBy('pos_order.createdAt', 'DESC')
      .getMany();
  }

  async getListOrder(): Promise<PosOrderEntity[]> {
    const queryBuilder = this.posOrderEntity.createQueryBuilder('pos_order');
    return await queryBuilder.orderBy('pos_order.createdAt', 'DESC').getMany();
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
