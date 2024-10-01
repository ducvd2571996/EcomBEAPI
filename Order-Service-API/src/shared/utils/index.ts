export * from './user.util';

export function formatPhone(phone: string) {
  if (phone) {
    phone = phone.replace(/^84/, '0');
  }
  return phone;
}
