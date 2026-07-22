import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Roles } from 'src/enums/Roles';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET_KEY'),
        });
    }

    async validate(payload: { sub: string; email: string; roles: Roles[] }) {
        return {
            id: payload.sub,
            email: payload.email,
            roles: payload.roles ?? [],
        };
    }
}
