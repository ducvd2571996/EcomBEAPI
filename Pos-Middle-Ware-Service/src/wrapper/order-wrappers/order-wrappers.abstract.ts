import { HttpClientRequestConfig, HttpClientResponse } from 'src/shared/http-client/http-client-options.types';

export abstract class OrderWrappersAPI {
  abstract createOrder(
    payload: OrderWrappersAPIType.CreateOrderPayloadDTO,
    configs?: HttpClientRequestConfig,
  ): Promise<HttpClientResponse>;

  abstract getOrder(
    payload: OrderWrappersAPIType.GetOrderPayload,
    configs?: HttpClientRequestConfig,
  ): Promise<HttpClientResponse>;

  abstract getListByCustomerId(
    payload: OrderWrappersAPIType.GetListOrderPayload,
    configs?: HttpClientRequestConfig,
  ): Promise<HttpClientResponse>;
}
