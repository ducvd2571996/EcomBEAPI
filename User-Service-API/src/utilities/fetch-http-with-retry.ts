import { HttpException, HttpStatus } from '@nestjs/common';
import ErrorTemplate from 'src/common/errors/error.interface';

/**
 * dùng khi muốn throw lỗi khi gọi api bị fail, nếu muốn dùng data đó để xử lý tiếp thì dùng cái khác
 * @param func function Promise<any>
 * @returns
 */
export const fetchHttpWithRetry = async <D>({
  request,
  error,
  maxRetries = 3,
  delay = 2000,
  needRetryCondition,
  keepGoingIfError = false,
}: {
  request: any;
  error?: ErrorTemplate;
  maxRetries: number;
  delay: number;
  needRetryCondition: any;
  keepGoingIfError?: boolean;
}): Promise<D> => {
  let retries = 0;
  let success = false;

  let res;
  while (retries <= maxRetries && !success) {
    try {
      res = await request();

      if (retries) {
        // logger.info({
        //   fields: {
        //     info: `finishAPIWithRetry url ${url}: ${retries} time (maxRetries: ${maxRetries}, retryDelay: ${retryDelay}ms)`,
        //   },
        // });
      }
      if (!needRetryCondition(res)) {
        success = true;
      } else {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    } catch (err) {
      console.error(err);
    }
    retries++;
  }

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
};
