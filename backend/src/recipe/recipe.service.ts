import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { CategoryService } from 'src/category/category.service';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';

@Injectable()
export class RecipeService {
    constructor(
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>,
        private readonly categoryService: CategoryService,
    ) {}

    async paginate(
        options: IPaginationOptions,
        filters: { category?: string; search?: string; author?: string } = {},
    ) {
        const qb = this.recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.author', 'author')
            .leftJoinAndSelect('recipe.categories', 'categories')
            .orderBy('recipe.createdAt', 'DESC');

        if (filters.category) {
            qb.andWhere('categories.slug = :categorySlug', {
                categorySlug: filters.category,
            });
        }

        if (filters.search?.trim()) {
            qb.andWhere('LOWER(recipe.title) LIKE LOWER(:search)', {
                search: `%${filters.search.trim()}%`,
            });
        }

        if (filters.author?.trim()) {
            qb.andWhere('LOWER(author.name) LIKE LOWER(:author)', {
                author: `%${filters.author.trim()}%`,
            });
        }

        return paginate<Recipe>(qb, options);
    }

    async paginateByAuthor(authorId: string, options: IPaginationOptions) {
        const qb = this.recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.author', 'author')
            .leftJoinAndSelect('recipe.categories', 'categories')
            .where('author.id = :authorId', { authorId })
            .orderBy('recipe.createdAt', 'DESC');

        return paginate<Recipe>(qb, options);
    }

    async findOne(id: string) {
        const recipe = await this.recipeRepository.findOne({
            where: { id },
            relations: ['author', 'categories'],
        });
        if (!recipe) {
            throw new NotFoundException('api.recipe.not.found');
        }
        return recipe;
    }

    async create(dto: CreateRecipeDto, authUser: AuthUser) {
        const categories = dto.categories?.length
            ? await this.categoryService.findOrCreateByNames(dto.categories)
            : [];

        const recipe = this.recipeRepository.create({
            title: dto.title,
            description: dto.description,
            image_url: dto.image_url,
            difficulty: dto.difficulty ?? null,
            durationMinutes: dto.durationMinutes ?? null,
            tools: dto.tools ?? [],
            ingredients: dto.ingredients,
            instructions: dto.instructions,
            author: { id: authUser.id },
            categories,
        });

        return this.recipeRepository.save(recipe);
    }

    async update(id: string, dto: UpdateRecipeDto, authUser: AuthUser) {
        const recipe = await this.findOne(id);
        this.assertOwner(recipe, authUser);

        if (dto.title !== undefined) recipe.title = dto.title;
        if (dto.description !== undefined) recipe.description = dto.description;
        if (dto.image_url !== undefined) recipe.image_url = dto.image_url;
        if (dto.difficulty !== undefined) recipe.difficulty = dto.difficulty;
        if (dto.durationMinutes !== undefined)
            recipe.durationMinutes = dto.durationMinutes;
        if (dto.tools !== undefined) recipe.tools = dto.tools;
        if (dto.ingredients !== undefined) recipe.ingredients = dto.ingredients;
        if (dto.instructions !== undefined)
            recipe.instructions = dto.instructions;
        if (dto.categories !== undefined) {
            recipe.categories = await this.categoryService.findOrCreateByNames(
                dto.categories,
            );
        }

        return this.recipeRepository.save(recipe);
    }

    async remove(id: string, authUser: AuthUser) {
        const recipe = await this.findOne(id);
        this.assertOwner(recipe, authUser);
        await this.recipeRepository.delete(id);
        return { message: 'api.recipe.deleted', recipeId: id };
    }

    private assertOwner(recipe: Recipe, authUser: AuthUser) {
        if (recipe.author?.id !== authUser.id) {
            throw new ForbiddenException('api.recipe.forbidden');
        }
    }
}
