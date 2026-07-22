import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enums/Roles';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: Roles[]) =>
    SetMetadata(ROLES_KEY, roles);
