import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';

@ApiTags('Category Public Routes')
@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Listar categorias' })
    findAll() {
        return this.categoryService.findAll();
    }
}
