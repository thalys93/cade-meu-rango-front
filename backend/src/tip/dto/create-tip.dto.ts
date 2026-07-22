import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipDto {
    @ApiProperty({ example: 'Dica de Economia Doméstica' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        example:
            'Economize dinheiro fazendo compras a granel e evite produtos embalados em excesso.',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}
