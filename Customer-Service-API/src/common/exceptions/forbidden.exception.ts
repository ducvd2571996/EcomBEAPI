import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMapper } from '../errors/error-code';

export class ForbiddenException extends HttpException {
  constructor({ code, message }: { code?: string; message?: string }) {
    super(
      HttpException.createBody({
        code: code || '403',
        errorCode: 'ERR:00403',
        message: message || ErrorMapper.getErrorMessage('API_ERROR:00403'),
      }),
      HttpStatus.FORBIDDEN,
    );
  }
}
