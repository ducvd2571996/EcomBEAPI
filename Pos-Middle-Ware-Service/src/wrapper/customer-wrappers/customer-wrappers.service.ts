import { Injectable } from '@nestjs/common';

import { HttpClientService, HttpMethod } from 'src/shared/http-client';
import { HttpClientRequestConfig, HttpClientResponse } from 'src/shared/http-client/http-client-options.types';
import { CustomerWrappersAPI } from './customer-wrappers.abstract';
import { CustomerWrappersEndpoint } from './customer-wrappers.endpoint';

@Injectable()
export class CustomerWrappersService extends CustomerWrappersAPI {
  constructor(private readonly httpClientService: HttpClientService) {
    super();
  }

  private customerWrappersMakeRequest<T>({
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

  getCustomer(
    payload: CustomerWrappersAPIType.GetCustomerPayload,
    configs?: HttpClientRequestConfig,
  ): Promise<HttpClientResponse<CustomerWrappersAPIType.GetCustomerResponse>> {
    return this.customerWrappersMakeRequest<CustomerWrappersAPIType.GetCustomerResponse>({
      method: HttpMethod.Get,
      url: `${CustomerWrappersEndpoint.ApiCustomer}/${payload.id}`,
      configs,
    });
  }
}
