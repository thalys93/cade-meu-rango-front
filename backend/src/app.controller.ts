import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { appConfig } from './config/app.config';

@ApiTags('System Routes')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('/system-check')
    @Header('Content-Type', 'text/html; charset=utf-8')
    @ApiOperation({
        summary: 'Verificação do sistema',
        description:
            'Endpoint para verificar se o sistema está funcionando corretamente.',
    })
    @ApiResponse({
        status: 200,
        description: 'Sistema funcionando corretamente',
        schema: {
            type: 'string',
            example: `${appConfig.name} is running!`,
        },
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor',
    })
    async getHello(): Promise<string> {
        return this.appService.systemCheck();
    }
}
