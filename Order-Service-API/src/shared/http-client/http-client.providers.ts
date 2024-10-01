import type { FactoryProvider } from '@nestjs/common';
import { HttpClientModuleOptions } from './http-client-options.types';
import Axios from 'axios';
import { HTTP_CLIENT_INSTANCE_TOKEN, HTTP_CLIENT_MODULE_OPTIONS } from './http-client.constant';

export const createHttpClientProvider = (): FactoryProvider => ({
  provide: HTTP_CLIENT_INSTANCE_TOKEN,
  useFactory: async (options: HttpClientModuleOptions) => {
    return Axios.create(options);
  },
  inject: [HTTP_CLIENT_MODULE_OPTIONS],
});
