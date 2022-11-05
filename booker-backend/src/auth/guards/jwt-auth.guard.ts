/* eslint-disable prettier/prettier */
import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if (err || !user) {
          throw err || new UnauthorizedException('You are not authorized!');
        }
        return user;
    }
}
