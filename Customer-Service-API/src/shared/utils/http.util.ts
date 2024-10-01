import { HttpException, HttpStatus } from '@nestjs/common';

export function throwHttpException({ message, code }) {
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      code: code || HttpStatus.BAD_REQUEST.toString(),
      message: message,
    },
    HttpStatus.BAD_REQUEST,
  );
}
