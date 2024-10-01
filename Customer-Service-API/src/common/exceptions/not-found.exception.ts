import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMapper } from '../errors/error-code';

export class NotFoundException extends HttpException {
  constructor({ code, message }: { code?: string; message?: string }) {
    super(
      HttpException.createBody({
        code: code || '404',
        errorCode: 'ERR:00404',
        message: message || ErrorMapper.getErrorMessage('API_ERROR:00404'),
      }),
      HttpStatus.NOT_FOUND,
    );
  }
}
