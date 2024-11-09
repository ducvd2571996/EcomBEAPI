import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from '../entities';
import { RemoveItemFromCartDto, UpdateCartDTO } from 'src/modules/cart/dto/request/cart.request.dto';
import _ from 'lodash';
@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartEntity: Repository<CartEntity>,
  ) {}

  async getCart(id: number): Promise<CartEntity> {
    return await this.cartEntity.findOneBy({ customerId: id });
  }

  async removeCart(customerId: number): Promise<any> {
    const cart = await this.cartEntity.findOneBy({ customerId });

    if (!cart) {
      throw new Error('Cart not found');
    }

    await this.cartEntity.delete({ customerId });

    return {};
  }

  async updateCart(data: UpdateCartDTO): Promise<any> {
    const cart = await this.cartEntity.findOneBy({ customerId: data?.customerId });
    const products = data?.products;
    if (!cart) {
      throw new Error('Cart not found');
    }

    const existingProductIndex = cart.products.findIndex((product) => product.id === data?.products[0]?.id);

    if (!data?.isAddToCart && data?.products?.length) {
      cart.products = data?.products;
    } else if (existingProductIndex >= 0) {
      // Check if the product already exists in the cart
      const existingProduct = cart.products[existingProductIndex];
      const updatedQuantity = existingProduct.quantity + products?.[0]?.quantity;
      existingProduct.quantity = updatedQuantity;
      cart.products[existingProductIndex] = existingProduct;
    } else {
      cart.products.push({ ...products?.[0] });
    }
    const formattedProducts = cart?.products?.map((x) => ({ ...x, price: parseInt(x?.price?.toString()) }));

    const subTotal = _.sumBy(formattedProducts, (product) => product.price * product.quantity);

    // Calculate totalDiscount
    const discountTotal = _.sumBy(
      formattedProducts,
      (product) => ((product.price * product.discount) / 100) * product?.quantity,
    );

    // Calculate totalPrice
    const totalPrice = _.sumBy(formattedProducts, (product) => {
      const discountAmount = (product.price * product.discount) / 100;
      const priceAfterDiscount = product.price - discountAmount;
      const taxAmount = (priceAfterDiscount * product.tax) / 100;
      const finalPricePerItem = priceAfterDiscount + taxAmount;

      // Multiply by quantity to get the total for each product
      return finalPricePerItem * product.quantity;
    });
    cart.subTotal = subTotal;
    cart.discountTotal = discountTotal;
    cart.coupon = data.coupon;
    cart.totalPrice = totalPrice;
    // Update the cart's updatedAt field and save the cart
    cart.updatedAt = new Date();
    await this.cartEntity.save(cart);
    return cart;
  }

  async removeItemFromCart(data: RemoveItemFromCartDto): Promise<any> {
    const cart = await this.cartEntity.findOneBy({ customerId: data?.customerId });
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.findIndex((product) => product.id === data?.productId);

    if (existingProductIndex >= 0) {
      cart.products = cart?.products.filter((item) => item?.id !== data?.productId);
    }

    if (cart?.products?.length === 0) {
      return await this.removeCart(data?.customerId);
    }

    const formattedProducts = cart?.products?.map((x) => ({ ...x, price: parseInt(x?.price?.toString()) }));

    const subTotal = _.sumBy(formattedProducts, (product) => product.price * product.quantity);

    // Calculate totalDiscount
    const discountTotal = _.sumBy(
      formattedProducts,
      (product) => ((product.price * product.discount) / 100) * product?.quantity,
    );

    // Calculate totalPrice
    const totalPrice = _.sumBy(formattedProducts, (product) => {
      const discountAmount = (product.price * product.discount) / 100;
      const priceAfterDiscount = product.price - discountAmount;
      const taxAmount = (priceAfterDiscount * product.tax) / 100;
      const finalPricePerItem = priceAfterDiscount + taxAmount;

      // Multiply by quantity to get the total for each product
      return finalPricePerItem * product.quantity;
    });
    cart.subTotal = subTotal;
    cart.discountTotal = discountTotal;
    cart.totalPrice = totalPrice;
    // Update the cart's updatedAt field and save the cart
    cart.updatedAt = new Date();
    await this.cartEntity.save(cart);
    return cart;
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
