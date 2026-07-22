import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';
import {
    RecipeControllerProtected,
    RecipeControllerPublic,
} from './recipe.controller';
import { CategoryModule } from 'src/category/category.module';

@Module({
    imports: [TypeOrmModule.forFeature([Recipe]), CategoryModule],
    controllers: [RecipeControllerPublic, RecipeControllerProtected],
    providers: [RecipeService],
    exports: [RecipeService],
})
export class RecipeModule {}
