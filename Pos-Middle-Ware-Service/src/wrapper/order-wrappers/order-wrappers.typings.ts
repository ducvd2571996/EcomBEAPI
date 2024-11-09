// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace OrderWrappersAPIType {
  type CreateOrderPayloadDTO = {
    cartId?: number;
    customerId?: number;
    orderStatus: string;
    paymentMethod: string;
    name?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    totalPrice?: number;
    subTotal?: number;
    discountTotal?: number;
    products?: any;
  };

  type GetOrderPayload = {
    id: number;
  };

  type GetListOrderPayload = {
    customerId: number;
  };

  type GetOrderResponse = {
    id: number;
    cartId: number;
    orderStatus: string;
    customerId: number;
    name?: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    totalPrice?: number;
    subTotal?: number;
    discountTotal?: number;
    products?: any;
  };
}
