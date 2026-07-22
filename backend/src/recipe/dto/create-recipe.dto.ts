import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { RecipeDifficulty } from 'src/enums/RecipeDifficulty';

export class CreateRecipeDto {
    @ApiProperty({ example: 'Bolo de Chocolate' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 'Um delicioso bolo de chocolate caseiro.' })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        example: 'https://exemplo.com/bolo.jpg',
        required: false,
    })
    @IsOptional()
    @IsString()
    image_url?: string;

    @ApiProperty({
        example: RecipeDifficulty.Medium,
        enum: RecipeDifficulty,
        required: false,
    })
    @IsOptional()
    @IsEnum(RecipeDifficulty)
    difficulty?: RecipeDifficulty;

    @ApiProperty({ example: 45, required: false })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    durationMinutes?: number;

    @ApiProperty({
        example: ['fouet', 'forma 24cm'],
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tools?: string[];

    @ApiProperty({
        example: ['2 xícaras de farinha', '1 xícara de açúcar'],
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    ingredients: string[];

    @ApiProperty({
        example: ['Pré-aqueça o forno a 180°C.', 'Misture os ingredientes.'],
        type: [String],
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    instructions: string[];

    @ApiProperty({
        example: ['Doces', 'Sobremesas'],
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories?: string[];
}
