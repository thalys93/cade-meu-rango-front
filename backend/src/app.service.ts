import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { appConfig } from './config/app.config';
import { buildSystemCheckHtml } from './templates/system-check.template';

@Injectable()
export class AppService {
    private logger = new Logger(AppService.name);

    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    async systemCheck(): Promise<string> {
        try {
            const isDbConnected = await this.checkDatabaseConnection();
            if (!isDbConnected) {
                return buildSystemCheckHtml(appConfig.name, {
                    status: 'error',
                    title: 'Falha na conexão',
                    message: 'Não foi possível conectar ao banco de dados.',
                });
            }

            const dbTime = await this.getDatabaseTime();
            const systemTime = new Date().toISOString();

            return buildSystemCheckHtml(appConfig.name, {
                status: 'success',
                title: 'Sistema operacional',
                message: 'Todas as verificações foram concluídas com sucesso.',
                dbTime,
                systemTime,
            });
        } catch (error) {
            this.logger.error('System Check Failed:', error);
            return buildSystemCheckHtml(appConfig.name, {
                status: 'error',
                title: 'Verificação falhou',
                message: (error as Error).message,
            });
        }
    }

    private async checkDatabaseConnection(): Promise<boolean> {
        try {
            await this.dataSource.query('SELECT 1');
            return true;
        } catch (error) {
            this.logger.error('Database connection failed:', error);
            return false;
        }
    }

    private async getDatabaseTime(): Promise<string> {
        try {
            const result = await this.dataSource.query(
                'SELECT NOW() AS currentTime',
            );
            return result[0]?.currenttime
                ? result[0].currenttime.toISOString()
                : 'No time found';
        } catch (error) {
            this.logger.error('Error retrieving DB time:', error);
            return 'Error retrieving DB time';
        }
    }
}
