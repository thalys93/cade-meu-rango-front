import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { appConfig } from './config/app.config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { rawBody: true });
    const version = appConfig.apiVersion;

    const swaggerConfig = new DocumentBuilder()
        .setTitle(appConfig.apiTitle)
        .setDescription(appConfig.swaggerDescription)
        .setVersion(version)
        .addApiKey(
            { type: 'apiKey', name: 'Authorization', in: 'header' },
            'key',
        )
        .setBasePath(`/api/${version}`)
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    document.paths = Object.keys(document.paths).reduce(
        (acc, path) => {
            acc[`/api/${version}${path}`] = document.paths[path];
            return acc;
        },
        {} as Record<string, unknown>,
    );

    SwaggerModule.setup(`api/${version}`, app, document, {
        jsonDocumentUrl: `api/${version}/openapi.json`,
        useGlobalPrefix: true,
    });

    app.setGlobalPrefix(`api/${version}`);

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'Origin',
            'X-Requested-With',
        ],
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    app.use(
        json({
            verify: (req: any, _res, buf) => {
                req.rawBody = buf.toString('utf8');
            },
        }),
    );

    await app.listen(appConfig.port, '0.0.0.0');
}
void bootstrap();
