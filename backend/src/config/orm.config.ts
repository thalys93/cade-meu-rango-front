import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const buildTypeOrmConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: 'postgres',
    username: configService.get<string>('DB_USERNAME', 'postgres'),
    password: configService.get<string>('DB_PASSWORD', 'postgres'),
    port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
    host: configService.get<string>('DB_HOST', 'localhost'),
    database: configService.get<string>('DB_NAME', 'cade_meu_rango_db'),
    synchronize: true,
    autoLoadEntities: true,
});
