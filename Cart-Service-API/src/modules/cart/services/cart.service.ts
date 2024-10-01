import { Injectable } from '@nestjs/common';
import { CartRepository } from 'src/database/repositories';
import { CreateCartDTO, UpdateCartDTO } from '../dto/request/cart.request.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async createCart(dataBody: CreateCartDTO) {
    return await this.cartRepository.createCart(dataBody);
  }

  async getCart(id: number) {
    return await this.cartRepository.getCart(id);
  }

  async updateCart(dataBody: UpdateCartDTO) {
    return await this.cartRepository.updateCart(dataBody);
  }
}
