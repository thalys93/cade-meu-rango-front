import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StorageService } from './storage.service';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/security/roles.guard';
import { RolesDecorator } from 'src/security/roles.decorator';
import { USER_ROLES } from 'src/enums/RoleGroups';
import { UploadTemplates } from 'src/enums/UploudTemplates';

@ApiTags('Storage Routes')
@Controller('storage')
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @RolesDecorator(...USER_ROLES)
    @Get('cloudinary-signature')
    @ApiOperation({
        summary: 'Gerar assinatura do Cloudinary',
        description:
            'Gera uma assinatura segura para upload de arquivos no Cloudinary.',
    })
    @ApiQuery({
        name: 'id',
        description: 'Identificador único usado como public_id no Cloudinary',
        type: String,
        example: 'user_avatar_123',
    })
    @ApiQuery({
        name: 'uploadPreset',
        description: 'Upload preset configurado no Cloudinary',
        type: UploadTemplates.toString(),
        example: UploadTemplates.Avatars,
    })
    @ApiQuery({
        name: 'displayName',
        description: 'Nome de exibição personalizado para o arquivo',
        type: String,
        required: false,
        example: 'Avatar do João Silva',
    })
    @ApiResponse({
        status: 200,
        description: 'Assinatura gerada com sucesso',
        type: String,
    })
    @ApiResponse({
        status: 400,
        description: 'Erro ao gerar assinatura',
    })
    async getCloudinarySignature(
        @Query('id') id: string,
        @Query('uploadPreset') uploadPreset: UploadTemplates,
        @Query('displayName') displayName?: string,
    ) {
        return this.storageService.generateCloudinarySignature(
            id,
            uploadPreset,
            displayName,
        );
    }
}
