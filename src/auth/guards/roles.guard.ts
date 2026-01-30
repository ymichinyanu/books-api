import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { RequireRole } from '../decorators/require-role.decorator';
import { PrismaService } from '../../prisma/prisma.service';

export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) {
      this.logger.error(
        `User object is not found in the request object. Make sure the auth guard is binded before the roles guard (Class: ${context.getClass().name}; Handler: ${context.getHandler().name})`,
      );

      throw new InternalServerErrorException();
    }

    const requiredRoles = this.reflector.get(RequireRole, context.getHandler());

    const hasAnyRole = await this.prismaService.user.findFirst({
      where: {
        id: BigInt(user.id),
        roles: {
          some: {
            name: {
              in: requiredRoles,
            },
          },
        },
      },
      select: { id: true },
    });

    if (!hasAnyRole) {
      throw new ForbiddenException();
    }

    return true;
  }
}
