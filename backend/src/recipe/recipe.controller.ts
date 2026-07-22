import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Methods } from 'src/enums/Methods';
import { RolesGuard } from 'src/security/roles.guard';
import { RolesDecorator } from 'src/security/roles.decorator';
import { USER_ROLES } from 'src/enums/RoleGroups';
import { User } from 'src/security/auth-user.decorator';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { PaginationHelper } from 'src/helpers/utils';

@ApiTags('Recipe Public Routes')
@Controller('recipes')
export class RecipeControllerPublic {
    constructor(private readonly recipeService: RecipeService) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Listar receitas' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'category', required: false, type: String })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'author', required: false, type: String })
    findAll(
        @PaginationHelper() { page },
        @Query('category') category?: string,
        @Query('search') search?: string,
        @Query('author') author?: string,
    ) {
        return this.recipeService.paginate(
            { page, limit: 10, route: '/recipes' },
            { category, search, author },
        );
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Detalhe da receita' })
    @ApiParam({ name: 'id', type: String })
    findOne(@Param('id') id: string) {
        return this.recipeService.findOne(id);
    }
}

@ApiTags('Recipe Protected Routes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@RolesDecorator(...USER_ROLES)
@Controller('auth/recipes')
export class RecipeControllerProtected {
    constructor(private readonly recipeService: RecipeService) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Listar minhas receitas' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    findMine(
        @PaginationHelper() { page, limit },
        @User() authUser: AuthUser,
    ) {
        return this.recipeService.paginateByAuthor(authUser.id, {
            page,
            limit,
            route: '/auth/recipes',
        });
    }

    @Post(Methods.CREATE)
    @HttpCode(201)
    @ApiOperation({ summary: 'Criar receita' })
    @ApiBody({ type: CreateRecipeDto })
    create(@Body() dto: CreateRecipeDto, @User() authUser: AuthUser) {
        return this.recipeService.create(dto, authUser);
    }

    @Patch(`${Methods.UPDATE}/:id`)
    @HttpCode(202)
    @ApiOperation({ summary: 'Atualizar própria receita' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateRecipeDto })
    update(
        @Param('id') id: string,
        @Body() dto: UpdateRecipeDto,
        @User() authUser: AuthUser,
    ) {
        return this.recipeService.update(id, dto, authUser);
    }

    @Delete(`${Methods.DELETE}/:id`)
    @HttpCode(202)
    @ApiOperation({ summary: 'Remover própria receita' })
    @ApiParam({ name: 'id', type: String })
    remove(@Param('id') id: string, @User() authUser: AuthUser) {
        return this.recipeService.remove(id, authUser);
    }
}
