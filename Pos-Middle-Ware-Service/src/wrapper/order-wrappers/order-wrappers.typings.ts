// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace OrderWrappersAPIType {
  type CreateOrderPayloadDTO = {
    cartId: number;
    customerId?: number;
    orderStatus: string;
    paymentMethod: string;
  };

  type GetOrderPayload = {
    id: number;
  };

  type GetOrderResponse = {
    id: number;
    customerId: number;
    cartId: number;
    orderStatus: string;
  };
}
