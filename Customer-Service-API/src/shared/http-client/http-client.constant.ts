export const HTTP_CLIENT_MODULE_OPTIONS = Symbol('HTTP_CLIENT_MODULE_OPTIONS');
export const HTTP_CLIENT_INSTANCE_TOKEN = Symbol('HTTP_CLIENT_INSTANCE_TOKEN');

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Patch = 'PATCH',
  Option = 'OPTIONS',
  Delete = 'DELETE',
}
