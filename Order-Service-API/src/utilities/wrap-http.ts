import { HttpException, HttpStatus } from '@nestjs/common';
import ErrorTemplate from 'src/common/errors/error.interface';

/**
 * dùng khi muốn throw lỗi khi gọi api bị fail, nếu muốn dùng data đó để xử lý tiếp thì dùng cái khác
 * @param func function Promise<any>
 * @returns
 */
export const wrapHttpQuery = async <D>({
  request,
  error,
  failValues,
}: {
  request: Promise<any>;
  error?: ErrorTemplate;
  failValues?: [] | null;
}): Promise<D> => {
  return request.then((res) => {
    if (res?.status !== HttpStatus.OK) {
      // th có kèm theo mã lỗi trả về

      if (error) {
        throw new HttpException(
          {
            ...res,
            ...res?.data?.error,
          },
          res?.status,
        );
      }
    }
    return res?.data || failValues || null;
  });
};
