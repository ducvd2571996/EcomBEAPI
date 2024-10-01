import { IPaging } from './paging.interface';

export interface IResponse<T> {
  status: number;
  message: string;
  data: T;
  pagination?: IPaging;
}
