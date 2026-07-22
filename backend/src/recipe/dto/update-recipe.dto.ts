import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Min,
    ValidateIf,
} from 'class-validator';
import { RecipeDifficulty } from 'src/enums/RecipeDifficulty';

export class UpdateRecipeDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    image_url?: string;

    @ApiPropertyOptional({ enum: RecipeDifficulty, nullable: true })
    @IsOptional()
    @ValidateIf((_, value) => value !== null)
    @IsEnum(RecipeDifficulty)
    difficulty?: RecipeDifficulty | null;

    @ApiPropertyOptional({ nullable: true })
    @IsOptional()
    @ValidateIf((_, value) => value !== null)
    @IsInt()
    @Min(1)
    durationMinutes?: number | null;

    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tools?: string[];

    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    ingredients?: string[];

    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    instructions?: string[];

    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    categories?: string[];
}
