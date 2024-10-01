import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities';
import { UpdateCartDTO } from 'src/modules/cart/dto/request/cart.request.dto';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartEntity: Repository<CartEntity>,
  ) {}

  async getCart(id: number): Promise<CartEntity> {
    return await this.cartEntity.findOneBy({ id });
  }

  async updateCart(data: UpdateCartDTO): Promise<any> {
    return await this.cartEntity.update({ id: data?.id }, { ...data, updatedAt: new Date() });
  }

  async createCart(data: any): Promise<any> {
    const cart = this.cartEntity.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);
    return await this.cartEntity.insert(cart);
  }
}
