import { HttpClientRequestConfig, HttpClientResponse } from 'src/shared/http-client/http-client-options.types';

export abstract class CustomerWrappersAPI {
  abstract getCustomer(
    payload: CustomerWrappersAPIType.GetCustomerPayload,
    configs?: HttpClientRequestConfig,
  ): Promise<HttpClientResponse>;
}
