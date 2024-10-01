import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { OrderWrappersService } from 'src/wrapper/order-wrappers';
import { CreateOrderPayloadDTO } from '../dto/oder.request.dto';
import { CustomerWrappersService } from 'src/wrapper/customer-wrappers';
import { CartWrappersService } from 'src/wrapper/cart-wrappers';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class POSService {
  token: string;
  constructor(
    private readonly orderService: OrderWrappersService,
    private readonly customerService: CustomerWrappersService,
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
      { id: dataBody.cartId },
      {
        headers: {
          Authorization: this.token,
        },
      },
    );
    if (dataBody?.customerId) {
      const existedCustomer = (await this.customerService.getCustomer(
        { id: dataBody.customerId },
        {
          headers: {
            Authorization: this.token,
          },
        },
      )) as any;
      if (!existedCustomer?.data?.status || existedCustomer?.data?.status !== 200) {
        return existedCustomer.data;
      }

      if (!existedCustomer?.data?.data) throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
    }

    if (!existedCart?.data?.data) throw new HttpException('Cart not found', HttpStatus.BAD_REQUEST);
    if (!existedCart?.data?.status || existedCart?.data?.status !== 200) return existedCart.data;

    const data = await this.orderService.createOrder(dataBody, {
      headers: {
        Authorization: this.token,
      },
    });
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
      { id: order.data.data.cartId },
      {
        headers: {
          Authorization: this.token,
        },
      },
    );

    const data = order.data.data as any;
    const cartData = cart.data.data;
    if (data?.customerId) {
      const customer = (await this.customerService.getCustomer(
        { id: data?.customerId },
        {
          headers: {
            Authorization: this.token,
          },
        },
      )) as any;

      data.customerName = customer?.data?.data?.name;
      data.customerPhone = customer?.data?.data?.phoneNumber;
    }

    return {
      ...data,
      note: cartData?.note,
      products: cartData?.products,
      totalPrice: cartData?.totalPrice,
      subTotal: cartData?.subTotal,
      discountTotal: cartData?.discountTotal,
      coupon: cartData?.coupon,
      tax: cartData?.tax,
    };
  }
}
