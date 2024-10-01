import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces';

export function decodeTokenUser(token) {
  const decode = jwtDecode<IUser>(token);
  const user = decode;
  // await next();
  return user;
}

// Hàm tạo token từ thông tin người dùng
export function generateToken(user: IUser) {
  return jwt.sign({ userName: user.name, userPassword: user.password }, 'fb6e98a3fef7ce2dc2dd79c0bd349ce7', {
    expiresIn: '24h',
  });
}

export function getInfoUser(token, headers) {
  if (token) {
    return decodeTokenUser(token);
  }

  if (headers) {
    return {};
  }

  return {};
}
