import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler()]);
    if (isPublic) {
      return true;
    }

    try {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization || request?.headers?.Authorization || '';
      if (!token) {
        throw new UnauthorizedException();
      }
      request.user = jwt.verify(token?.replace?.(/^Bearer\s+/i, ''), 'fb6e98a3fef7ce2dc2dd79c0bd349ce7');
      request.token = token;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
