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
import { TipService } from './tip.service';
import { CreateTipDto } from './dto/create-tip.dto';
import { UpdateTipDto } from './dto/update-tip.dto';
import { Methods } from 'src/enums/Methods';
import { RolesGuard } from 'src/security/roles.guard';
import { RolesDecorator } from 'src/security/roles.decorator';
import { USER_ROLES } from 'src/enums/RoleGroups';
import { User } from 'src/security/auth-user.decorator';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { PaginationHelper } from 'src/helpers/utils';

@ApiTags('Tip Public Routes')
@Controller('tips')
export class TipControllerPublic {
    constructor(private readonly tipService: TipService) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Listar dicas' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'author', required: false, type: String })
    findAll(
        @PaginationHelper() { page },
        @Query('search') search?: string,
        @Query('author') author?: string,
    ) {
        return this.tipService.paginate(
            { page, limit: 10, route: '/tips' },
            { search, author },
        );
    }

    @Get(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Detalhe da dica' })
    @ApiParam({ name: 'id', type: String })
    findOne(@Param('id') id: string) {
        return this.tipService.findOne(id);
    }
}

@ApiTags('Tip Protected Routes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@RolesDecorator(...USER_ROLES)
@Controller('auth/tips')
export class TipControllerProtected {
    constructor(private readonly tipService: TipService) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Listar minhas dicas' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    findMine(
        @PaginationHelper() { page, limit },
        @User() authUser: AuthUser,
    ) {
        return this.tipService.paginateByAuthor(authUser.id, {
            page,
            limit,
            route: '/auth/tips',
        });
    }

    @Post(Methods.CREATE)
    @HttpCode(201)
    @ApiOperation({ summary: 'Criar dica' })
    @ApiBody({ type: CreateTipDto })
    create(@Body() dto: CreateTipDto, @User() authUser: AuthUser) {
        return this.tipService.create(dto, authUser);
    }

    @Patch(`${Methods.UPDATE}/:id`)
    @HttpCode(202)
    @ApiOperation({ summary: 'Atualizar própria dica' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: UpdateTipDto })
    update(
        @Param('id') id: string,
        @Body() dto: UpdateTipDto,
        @User() authUser: AuthUser,
    ) {
        return this.tipService.update(id, dto, authUser);
    }

    @Delete(`${Methods.DELETE}/:id`)
    @HttpCode(202)
    @ApiOperation({ summary: 'Remover própria dica' })
    @ApiParam({ name: 'id', type: String })
    remove(@Param('id') id: string, @User() authUser: AuthUser) {
        return this.tipService.remove(id, authUser);
    }
}
