import { Injectable } from '@nestjs/common';
import { OrderWrappersAPI } from './order-wrappers.abstract';
import { OrderWrappersEndpoint } from './order-wrappers.endpoint';
import { HttpClientService, HttpMethod } from 'src/shared/http-client';
import { HttpClientRequestConfig, HttpClientResponse } from 'src/shared/http-client/http-client-options.types';

@Injectable()
export class OrderWrappersService extends OrderWrappersAPI {
  constructor(private readonly httpClientService: HttpClientService) {
    super();
  }

  private orderWrappersMakeRequest<T>({
    method,
    url,
    data,
    params,
    pathParams,
    configs,
  }: any): Promise<HttpClientResponse<T>> {
    return this.httpClientService.request<T>({
      method,
      url,
      data,
      params,
      pathParams,
      ...configs,
    });
  }

  createOrder(payload: OrderWrappersAPIType.CreateOrderPayloadDTO, configs?: HttpClientRequestConfig): Promise<any> {
    return this.orderWrappersMakeRequest<OrderWrappersAPIType.CreateOrderPayloadDTO>({
      method: HttpMethod.Post,
      url: OrderWrappersEndpoint.ApiOrder,
      data: payload,
      configs,
    });
  }

  getOrder(
    payload: OrderWrappersAPIType.GetOrderPayload,
    configs?: HttpClientRequestConfig,
  ): Promise<HttpClientResponse<OrderWrappersAPIType.GetOrderResponse>> {
    return this.orderWrappersMakeRequest<OrderWrappersAPIType.GetOrderResponse>({
      method: HttpMethod.Get,
      url: `${OrderWrappersEndpoint.ApiOrder}/${payload.id}`,
      configs,
    });
  }
}
