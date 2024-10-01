import { IErrorResponse } from '../interfaces';

export class ApiError extends Error {
  private readonly errors: IErrorResponse;
  // Constructor({ errorCode: string, message?: string, status?: HttpStatus, data?: any }) {
  //   super();
  // }
}
