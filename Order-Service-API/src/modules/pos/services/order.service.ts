import { Injectable } from '@nestjs/common';
import { PosOrderRepository } from 'src/database/repositories';
import { CreateOrderPayloadDTO } from '../dto/oder.request.dto';

@Injectable()
export class OrderService {
  constructor(private readonly posOrderRepository: PosOrderRepository) {}

  async create(dataBody: CreateOrderPayloadDTO) {
    return await this.posOrderRepository.createOrder(dataBody);
  }

  async get(id: number) {
    return await this.posOrderRepository.getOrder(id);
  }
}
