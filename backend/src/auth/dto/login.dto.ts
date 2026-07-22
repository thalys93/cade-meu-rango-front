import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
    @ApiProperty({
        description: 'Email do usuário para autenticação',
        example: 'usuario@exemplo.com',
        type: String,
    })
    @IsNotEmpty({ message: 'Email é obrigatório' })
    @IsEmail({}, { message: 'Email deve ter um formato válido' })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário para autenticação',
        example: 'minhasenha123',
        type: String,
        minLength: 6,
    })
    @IsNotEmpty({ message: 'Senha é obrigatória' })
    password: string;
}
