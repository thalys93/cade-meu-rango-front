import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { Roles } from 'src/enums/Roles';
import { hasAnyRole, resolveUserRoles } from 'src/helpers/utils';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Roles[]>(
            ROLES_KEY,
            context.getHandler(),
        );
        if (!requiredRoles) {
            return true;
        }

        const request = context
            .switchToHttp()
            .getRequest<Request & { user?: AuthUser }>();

        const userRoles = resolveUserRoles(request.user?.roles);

        if (!hasAnyRole(userRoles, requiredRoles)) {
            throw new ForbiddenException('api.role.forbidden');
        }

        return true;
    }
}
