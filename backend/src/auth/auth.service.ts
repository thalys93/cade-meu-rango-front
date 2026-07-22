import {
    HttpException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../user/user.service';
import { loginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthUser } from './interfaces/auth-user.interface';
import { MailService } from '../mail/mail.service';
import { generatePass } from '../helpers/generateToken';
import { User } from '../user/entities/user.entity';
import { resolveUserRoles } from '../helpers/utils';

@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    private buildAuthResponse(user: User) {
        const roleNames = resolveUserRoles(user.roles);
        if (!roleNames.length) {
            this.logger.warn('Cargos do usuário não definidos');
            throw new UnauthorizedException('api.user.role.not.defined');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            roles: roleNames,
        };

        return {
            token: this.jwtService.sign(payload),
            userData: {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: roleNames,
            },
        };
    }

    async register(dto: RegisterDto) {
        this.logger.log('Registrando novo usuário...');
        const user = await this.userService.create({
            name: dto.name,
            email: dto.email,
            password: dto.password,
        });

        const withRoles = await this.userService.findByIdWithRoles(user.id);
        if (!withRoles) {
            throw new UnauthorizedException('api.user.not.found');
        }

        await this.mailService.sendWelcomeMail(withRoles.email);
        this.logger.log('Registro realizado com sucesso!!');
        return this.buildAuthResponse(withRoles);
    }

    async login(user: User, Login: loginDto) {
        this.logger.log('Realizando Login...');
        return this.buildAuthResponse(user);
    }

    async me(user: AuthUser) {
        const { found } = await this.userService.findOne(user.id);
        return found;
    }

    async validateUser(email: string, password: string) {
        let user: any;
        this.logger.log('Validando Usuário...');
        try {
            user = await this.userService.findByEmail(email);
        } catch (e) {
            return null;
        }

        if (!user.password && password === '') {
            this.logger.log('Login social efetuado com sucesso!!');
            return user;
        }

        const isPassWordValid = compareSync(password, user.password);
        if (!isPassWordValid) return null;

        this.logger.log('Login efetuado com sucesso!!');
        return user;
    }

    async checkToken(token: string, email: string) {
        const user = await this.userService.findByEmail(email);
        this.logger.log('Verificando Token...');
        if (user.recoverToken === token) {
            this.logger.log('Token Valido');
            return { message: 'api.user.token.valid', statusCode: 200 };
        } else {
            this.logger.log('Token Inválido');
            return new HttpException(
                { message: 'api.user.token.invalid' },
                401,
            );
        }
    }

    async requestPasswordReset(email: string) {
        const user = await this.userService.findByEmail(email);
        const code = generatePass();
        await this.mailService.sendPasswordResetMail(email, code);
        await this.userService.updateToken(user.id, code);
        return { message: 'api.password.reset.email.sent' };
    }

    async verifyResetCode(email: string, code: string) {
        const result = await this.checkToken(code, email);
        if (result instanceof HttpException) throw result;
        return { message: 'api.password.reset.code.valid' };
    }

    async resetPassword(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user.recoverToken) {
            throw new UnauthorizedException('api.user.token.invalid');
        }

        await this.userService.updatePasswordByEmail(email, password);
        await this.userService.updateToken(user.id, null as any);
        return { message: 'api.password.reset.success' };
    }
}
