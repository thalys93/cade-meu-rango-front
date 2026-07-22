import { messagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from './../../helpers/regex.helper';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Nome completo do usuário',
        example: 'João Silva',
        minLength: 1,
        type: String,
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email do usuário (deve ser um email válido)',
        example: 'joao.silva@exemplo.com',
        format: 'email',
        type: String,
    })
    @IsNotEmpty()
    @Matches(RegExHelper.email, { message: messagesHelper.emailMessage })
    email: string;

    @ApiProperty({
        description:
            'Senha do usuário (deve conter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial)',
        example: 'MinhaSenh@123',
        minLength: 8,
        type: String,
    })
    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: messagesHelper.passwordMessages })
    password: string;

    @ApiProperty({
        description: 'URL do avatar/foto do usuário',
        example: 'https://exemplo.com/avatar.jpg',
        required: false,
        type: String,
    })
    @IsOptional()
    avatar_url?: string;

    @ApiProperty({
        description: 'Configurações do usuário em formato JSON',
        required: false,
        type: Object,
    })
    @IsOptional()
    settings?: Record<string, unknown>;
}
