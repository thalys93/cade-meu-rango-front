import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedingService } from './seeding.service';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Tip } from 'src/tip/entities/tip.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Role, User, Category, Recipe, Tip]),
    ],
    providers: [SeedingService],
})
export class SeedingModule {}
