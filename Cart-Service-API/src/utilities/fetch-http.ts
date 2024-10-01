import { HttpException, HttpStatus } from '@nestjs/common';
import ErrorTemplate from 'src/common/errors/error.interface';

/**
 * dùng khi muốn throw lỗi khi gọi api bị fail, nếu muốn dùng data đó để xử lý tiếp thì dùng cái khác
 * @param func function Promise<any>
 * @returns
 */
export const fetchHttp = async <D>({
  request,
  error,
  keepGoingIfError,
}: {
  request: Promise<any>;
  error?: ErrorTemplate;
  keepGoingIfError?: boolean;
}): Promise<D> => {
  return request.then((res) => {
    if (res?.status === HttpStatus.OK) {
      return res?.data;
    }

    if (keepGoingIfError) {
      return res?.data;
    }

    if (error) {
      throw new HttpException(
        {
          ...res,
          ...error,
        },
        400,
      );
    }

    throw new HttpException(
      {
        ...res,
        ...res?.data?.error,
      },
      res?.status || 500,
    );
  });
};
