import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorMapper } from '../errors/error-code';

export class BadRequestException extends HttpException {
  constructor({ code, message, member }: { code?: string; message?: string; member?: Array<string> }) {
    super(
      HttpException.createBody({
        code: code || '400',
        errorCode: 'ERR:00400',
        message: message || ErrorMapper.getErrorMessage('API_ERROR:00400'),
        member: member || [],
      }),
      HttpStatus.BAD_REQUEST,
    );
  }
}
