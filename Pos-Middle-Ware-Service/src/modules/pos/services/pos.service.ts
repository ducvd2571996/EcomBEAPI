import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { CartWrappersService } from 'src/wrapper/cart-wrappers';
import { OrderWrappersService } from 'src/wrapper/order-wrappers';
import { CreateOrderPayloadDTO, GetOrderResponse } from '../dto/oder.request.dto';

@Injectable()
export class POSService {
  token: string;
  constructor(
    private readonly orderService: OrderWrappersService,
    private readonly cartService: CartWrappersService,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {
    this.token =
      (this.request?.headers?.['Authorization'] as string) ||
      (this.request?.headers?.['authorization'] as string) ||
      '';
  }

  async create(dataBody: CreateOrderPayloadDTO) {
    const existedCart = await this.cartService.getCart(
      { id: dataBody?.customerId },
      {
        headers: {
          Authorization: this.token,
        },
      },
    );
    const existedCartData = existedCart?.data?.data;
    if (!existedCartData) throw new HttpException('Cart not found', HttpStatus.BAD_REQUEST);
    if (!existedCart?.data?.status || existedCart?.data?.status !== 200) return existedCart.data;
    if (existedCartData) {
      dataBody.subTotal = existedCartData?.subTotal;
      dataBody.discountTotal = existedCartData?.discountTotal;
      dataBody.totalPrice = existedCartData?.totalPrice;
      dataBody.products = existedCartData?.products;
    }

    const data = await this.orderService.createOrder(dataBody, {
      headers: {
        Authorization: this.token,
      },
    });

    await this.cartService.removeCart(
      { id: dataBody?.customerId },
      {
        headers: {
          Authorization: this.token,
        },
      },
    );

    return { ...data.data };
  }

  async get(id: number) {
    const order = (await this.orderService.getOrder(
      { id },
      {
        headers: {
          Authorization: this.token,
        },
      },
    )) as any;
    const cart = await this.cartService.getCart(
      { id: order.data?.data?.cartId },
      {
        headers: {
          Authorization: this.token,
        },
      },
    );

    const data = order.data.data as any;
    const cartData = cart.data.data;

    return {
      ...data,
      note: cartData?.note,
      products: cartData?.products,
      totalPrice: cartData?.totalPrice,
      subTotal: cartData?.subTotal,
      discountTotal: cartData?.discountTotal,
    };
  }

  async getListByCustomerId(customerId: number): Promise<GetOrderResponse[]> {
    const data = (await this.orderService.getListByCustomerId(
      { customerId },
      {
        headers: {
          Authorization: this.token,
        },
      },
    )) as any;
    return data?.data?.data;
  }
}
