import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildTypeOrmConfig } from './config/orm.config';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './storage/storage.module';
import { SeedingModule } from './seeding/seeding.module';
import { UserModule } from './user/user.module';
import { FeatureFlagsModule } from './feature-flags/feature-flags.module';
import { CategoryModule } from './category/category.module';
import { RecipeModule } from './recipe/recipe.module';
import { TipModule } from './tip/tip.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                buildTypeOrmConfig(configService),
        }),
        FeatureFlagsModule,
        RolesModule,
        MailModule,
        AuthModule,
        StorageModule,
        UserModule,
        CategoryModule,
        RecipeModule,
        TipModule,
        SeedingModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
