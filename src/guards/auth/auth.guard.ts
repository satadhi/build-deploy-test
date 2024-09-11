import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | Observable<boolean> | boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;

    if (!auth) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = auth.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }


    return this.jwtService.verifyAsync(token)
      .then((res) => {

        req.user = {
          userId: res.sub,
          username: res.username
        }
        return true;
      }).catch(err => {
        throw new UnauthorizedException('Invalid token');

      });

  }
}
