import { HttpStatus } from '@nestjs/common';

export interface IErrorResponse {
  status: HttpStatus;
  error: any;
  timestamp: string;
  path: string;
  method: string;
  url: string;
  imageUrl: string;
  data?: Record<string, unknown>;
}
