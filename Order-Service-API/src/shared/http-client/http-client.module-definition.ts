import { ConfigurableModuleBuilder } from '@nestjs/common';
import { HTTP_CLIENT_MODULE_OPTIONS } from './http-client.constant';
import { HttpClientModuleOptions } from './http-client-options.types';
import { createHttpClientProvider } from './http-client.providers';

export const { ConfigurableModuleClass } = new ConfigurableModuleBuilder<HttpClientModuleOptions>({
  moduleName: 'HttpClient',
  optionsInjectionToken: HTTP_CLIENT_MODULE_OPTIONS,
})
  .setFactoryMethodName('createHttpClientOptions')
  .setExtras<HttpClientModuleOptions>({}, (definition) => {
    const providers = (definition.providers ??= []);
    const exports = (definition.exports ??= []);
    const httpClientProvider = createHttpClientProvider();
    providers.push(httpClientProvider);
    exports.push(httpClientProvider);
    return definition;
  })
  .build();
