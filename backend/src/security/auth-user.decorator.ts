import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): AuthUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
