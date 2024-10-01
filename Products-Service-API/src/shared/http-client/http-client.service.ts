import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { API_TIMEOUT } from '../../constants';
import { HTTP_CLIENT_INSTANCE_TOKEN } from './http-client.constant';
@Injectable()
export class HttpClientService implements OnModuleInit {
  private readonly logger: Logger = new Logger(HttpClientService.name);
  constructor(
    @Inject(HTTP_CLIENT_INSTANCE_TOKEN)
    protected readonly instance: AxiosInstance,
  ) {}

  onModuleInit() {
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      // Please don't tell my Typescript compiler...
      config['metadata'] = { ...config['metadata'], startTime: new Date() };
      config.timeout = API_TIMEOUT;
      config.paramsSerializer = (params) => {
        return stringify(params);
      };
      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        const { config, data, status } = response;
        config['metadata'] = { ...config['metadata'], endTime: Date.now() };
        const duration = config['metadata']?.endTime - config['metadata']?.startTime;
        this.logger.log({
          message: 'Core Service',
          fields: {
            info: 'Core Service',
            method: `${config.method.toUpperCase()}`,
            url: `${config.baseURL}${config.url}`,
            status: status,
            bodyReq: JSON.stringify(config.data),
            paramsReq: JSON.stringify(config.params),
            timeExecuted: duration,
            unitTime: 'ms',
            dataRes: JSON.stringify(data),
          },
        });
        return response;
      },
      (error) => {
        const { response = {}, config } = error;
        const { status, data } = response as AxiosResponse;
        config['metadata'] = { ...config['metadata'], endTime: Date.now() };
        const duration = config['metadata']?.endTime - config['metadata']?.startTime;
        this.logger.error(
          {
            message: 'Error Core Service',
            fields: {
              info: 'Error Core Service',
              method: `${config.method.toUpperCase()}`,
              url: `${config.baseURL}${config.url}`,
              status: status,
              bodyReq: JSON.stringify(config.data),
              paramsReq: JSON.stringify(config.params),
              timeExecuted: duration || 0,
              unitTime: 'ms',
              dataRes: JSON.stringify(data) || error.message || '',
            },
          },
          'Error Core',
        );
        return Promise.reject(error);
      },
    );
  }

  get axiosRef(): AxiosInstance {
    return this.instance;
  }

  protected async makeRequest<T>(axios: (...args: any[]) => AxiosPromise<T>, ...args: any[]) {
    return new Promise<AxiosResponse<T>>((resolve, reject) => {
      axios(...args)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async request<T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.request, config);
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.get, url, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.delete, url, config);
  }

  async head<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.head, url, config);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.post, url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.put, url, data, config);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>(this.instance.patch, url, data, config);
  }
}
