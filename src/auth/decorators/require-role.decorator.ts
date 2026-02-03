import { Reflector } from '@nestjs/core';
import { Role } from '../../users/roles/roles';

export const RequireRole = Reflector.createDecorator<Role[]>();
