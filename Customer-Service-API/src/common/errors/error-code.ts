export enum Errors {
  // common
  'API_ERROR:00000' = 'Something went wrong',
  'API_ERROR:00204' = 'No content',
  'API_ERROR:00400' = 'Bad request',
  'API_ERROR:000401' = 'Authen failure',
  'API_ERROR:00404' = 'Not found',
  'API_ERROR:00403' = 'Forbidden',
  'API_ERROR:00500' = 'Internal server error',
}

// List mã lỗi
type ErrorCodes = keyof typeof Errors;

// xử lý mã lỗi
export class ErrorMapper {
  private static errorMap = ErrorMapper.createErrorMap();

  static getErrorMessage(code: ErrorCodes): string {
    if (this.errorMap.has(code)) {
      return this.errorMap.get(code);
    }
    return 'Error code has not been defined';
  }

  static getErrorOject(code: ErrorCodes): { code: string; message: string } {
    if (this.errorMap.has(code)) {
      return { code, message: this.errorMap.get(code) };
    }
    return { code: 'API_ERROR:10000', message: this.errorMap.get('API_ERROR:10000') };
  }

  static defaultErrorCode() {
    return 'ERR:00000';
  }

  private static createErrorMap(): Map<string, string> {
    const listError = new Map<ErrorCodes | string, string>();
    Object.keys(Errors)?.forEach((errorCode) => {
      listError.set(errorCode, Errors[errorCode]);
    });

    return listError;
  }
}
