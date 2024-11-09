import { Injectable } from '@nestjs/common';
import { CartWrappersAPI } from './cart-wrappers.abstract';
import { CartWrappersEndpoint } from './cart-wrappers.endpoint';
import { HttpClientService, HttpMethod } from 'src/shared/http-client';
import { HttpClientRequestConfig, HttpClientResponse } from 'src/shared/http-client/http-client-options.types';

@Injectable()
export class CartWrappersService extends CartWrappersAPI {
  constructor(private readonly httpClientService: HttpClientService) {
    super();
  }

  private cartWrappersMakeRequest<T>({
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

  getCart(payload: CartWrappersAPIType.GetCartPayload, configs?: HttpClientRequestConfig): Promise<HttpClientResponse> {
    return this.cartWrappersMakeRequest<CartWrappersAPIType.GetCartPayload>({
      method: HttpMethod.Get,
      url: `${CartWrappersEndpoint.ApiCart}/${payload.id}`,
      configs,
    });
  }

  removeCart(
    payload: CartWrappersAPIType.GetCartPayload,
    configs?: HttpClientRequestConfig,
  ): Promise<HttpClientResponse> {
    return this.cartWrappersMakeRequest<CartWrappersAPIType.GetCartPayload>({
      method: HttpMethod.Delete,
      url: `${CartWrappersEndpoint.ApiCart}/${payload.id}`,
      configs,
    });
  }
}
