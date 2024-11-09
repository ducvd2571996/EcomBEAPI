import { Injectable } from '@nestjs/common';
import { CartRepository } from 'src/database/repositories';
import { CreateCartDTO, RemoveItemFromCartDto, UpdateCartDTO } from '../dto/request/cart.request.dto';
import _ from 'lodash';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async createCart(dataBody: CreateCartDTO) {
    const products = dataBody?.products?.map((x) => ({ ...x, price: parseInt(x?.price?.toString()) }));

    // Calculate subTotal
    const subTotal = _.sumBy(products, (product) => product.price * product.quantity);

    // Calculate totalDiscount
    const discountTotal = _.sumBy(
      products,
      (product) => ((product.price * product.discount) / 100) * product?.quantity,
    );

    // Calculate totalPrice
    const totalPrice = _.sumBy(products, (product) => {
      const discountAmount = (product.price * product.discount) / 100;
      const priceAfterDiscount = product.price - discountAmount;
      const taxAmount = (priceAfterDiscount * product.tax) / 100;
      const finalPricePerItem = priceAfterDiscount + taxAmount;

      // Multiply by quantity to get the total for each product
      return finalPricePerItem * product.quantity;
    });
    return await this.cartRepository.createCart({ ...dataBody, totalPrice, subTotal, discountTotal });
  }

  async getCart(customerId: number) {
    return await this.cartRepository.getCart(customerId);
  }

  async removeCart(customerId: number) {
    return await this.cartRepository.removeCart(customerId);
  }

  async removeItemFromCart(dataBody: RemoveItemFromCartDto) {
    return await this.cartRepository.removeItemFromCart(dataBody);
  }

  async updateCart(dataBody: UpdateCartDTO) {
    return await this.cartRepository.updateCart(dataBody);
  }
}
