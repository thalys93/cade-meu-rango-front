import {
    Controller,
    Body,
    Patch,
    Delete,
    UseGuards,
    HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiBody,
} from '@nestjs/swagger';
import { Methods } from 'src/enums/Methods';
import { RolesGuard } from 'src/security/roles.guard';
import { RolesDecorator } from 'src/security/roles.decorator';
import { User } from 'src/security/auth-user.decorator';
import { AuthUser } from 'src/auth/interfaces/auth-user.interface';
import { USER_ROLES } from 'src/enums/RoleGroups';

@ApiTags('User Protected Routes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@RolesDecorator(...USER_ROLES)
@Controller('/auth/users')
export class UserControllerProtected {
    constructor(private readonly usersService: UserService) {}

    @Patch(`${Methods.UPDATE}/me`)
    @HttpCode(202)
    @ApiOperation({
        summary: 'Atualizar próprios dados',
        description:
            'Permite que o usuário autenticado atualize seus próprios dados.',
    })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({
        status: 202,
        description: 'Dados atualizados com sucesso',
    })
    @ApiResponse({
        status: 401,
        description: 'Token de autenticação inválido ou ausente',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    updateMe(@User() authUser: AuthUser, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(authUser.id, updateUserDto);
    }

    @Delete(`${Methods.DELETE}/me`)
    @HttpCode(202)
    @ApiOperation({
        summary: 'Remover própria conta',
        description: 'Remove a conta do usuário autenticado.',
    })
    @ApiResponse({
        status: 202,
        description: 'Usuário removido com sucesso',
    })
    @ApiResponse({
        status: 401,
        description: 'Token de autenticação inválido ou ausente',
    })
    removeMe(@User() authUser: AuthUser) {
        return this.usersService.remove(authUser.id);
    }
}
