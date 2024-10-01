import { HttpClientRequestConfig, HttpClientResponse } from 'src/shared/http-client/http-client-options.types';

export abstract class CartWrappersAPI {
  abstract getCart(
    payload: CartWrappersAPIType.GetCartPayload,
    configs?: HttpClientRequestConfig,
  ): Promise<HttpClientResponse>;
}
