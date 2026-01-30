import { Reflector } from '@nestjs/core';
import { Role } from '../../user/roles/roles';

export const RequireRole = Reflector.createDecorator<Role[]>();
