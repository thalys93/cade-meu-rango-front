import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
    @ApiProperty({
        description: 'Nome do papel/função do usuário no sistema',
        example: 'admin',
        minLength: 1,
        type: String,
    })
    @IsNotEmpty()
    name: string;
}
