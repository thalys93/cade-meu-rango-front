import { messagesHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';
import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({
        description: 'Nome completo do usuário',
        example: 'Maria Silva',
        type: String,
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'maria@exemplo.com',
        type: String,
    })
    @IsNotEmpty()
    @Matches(RegExHelper.email, { message: messagesHelper.emailMessage })
    email: string;

    @ApiProperty({
        description:
            'Senha (mín. 8 caracteres, maiúscula, minúscula, número e especial)',
        example: 'MinhaSenh@123',
        type: String,
    })
    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: messagesHelper.passwordMessages })
    password: string;
}
