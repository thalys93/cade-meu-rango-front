import {
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { loginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/security/auth-user.decorator';
import { AuthUser } from './interfaces/auth-user.interface';
import { User as UserEntity } from 'src/user/entities/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyResetDto } from './dto/verify-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth Routes')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(201)
    @ApiOperation({ summary: 'Criar conta e autenticar' })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'Conta criada com sucesso' })
    @ApiResponse({ status: 409, description: 'Email já cadastrado' })
    async register(@Body() dto: RegisterDto) {
        return await this.authService.register(dto);
    }

    @UseGuards(AuthGuard('local'))
    @HttpCode(200)
    @Post('login')
    @ApiOperation({
        summary: 'Autenticar usuário',
        description:
            'Realiza a autenticação do usuário com email e senha, retornando um token JWT para acesso às rotas protegidas.',
    })
    @ApiBody({
        type: loginDto,
        description: 'Credenciais de login do usuário',
    })
    @ApiResponse({
        status: 200,
        description: 'Login realizado com sucesso',
    })
    @ApiResponse({
        status: 401,
        description: 'Credenciais inválidas',
    })
    async login(@Body() loginData: loginDto, @User() user: UserEntity) {
        return await this.authService.login(user, loginData);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({
        summary: 'Obter dados do usuário autenticado',
    })
    @ApiResponse({
        status: 200,
        description: 'Dados do usuário autenticado',
    })
    @ApiResponse({
        status: 401,
        description: 'Token inválido ou expirado',
    })
    async me(@User() user: AuthUser) {
        return await this.authService.me(user);
    }

    @Post('password/forgot')
    @HttpCode(200)
    async forgot(@Body() dto: ForgotPasswordDto) {
        return await this.authService.requestPasswordReset(dto.email);
    }

    @Post('password/verify')
    @HttpCode(200)
    async verify(@Body() dto: VerifyResetDto) {
        return await this.authService.verifyResetCode(dto.email, dto.code);
    }

    @Post('password/reset')
    @HttpCode(200)
    async reset(@Body() dto: ResetPasswordDto) {
        return await this.authService.resetPassword(dto.email, dto.password);
    }
}
