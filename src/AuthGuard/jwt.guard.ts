import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        console.log('user ---- >', user);
      if (info instanceof TokenExpiredError) {
        throw new BadRequestException('oops!, your session is expired');
      }
      if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException(
          'oops!, you are unauthorized or invalid token',
        );
      }
      return super.handleRequest(err, user, info, context, status);
    }
  }


  // while using authGuard [JwtAuthguard(this is a class of authguard used above), JwtStrategy] should be provided into UserModule
  // and in ( export class JwtAuthGuard extends AuthGuard('jwt') ) auth guard 'jwt' should be given 