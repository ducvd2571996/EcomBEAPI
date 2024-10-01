import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpClientModuleOptions = AxiosRequestConfig;
export type HttpClientResponse<T = any> = AxiosResponse<T>;
export type HttpClientRequestConfig = AxiosRequestConfig;
export type HttpClientModuleOptionsFactory = {
  createHttpClientOptions(): Promise<HttpClientModuleOptions> | HttpClientModuleOptions;
};
