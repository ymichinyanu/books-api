import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private extractBearerToken(value: string | undefined) {
    if (!value) return null;

    const [scheme, token] = value.split(' ');

    if (scheme !== 'Bearer') return null;

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    const token = this.extractBearerToken(authorization);

    if (!token) throw new UnauthorizedException();

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      request.user = {
        id: tokenPayload.sub,
        name: tokenPayload.name,
      };

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
