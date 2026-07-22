export const appConfig = {
    name: process.env.APP_NAME ?? 'Cadê Meu Rango',
    apiTitle: process.env.API_TITLE ?? 'Cadê Meu Rango API',
    swaggerDescription:
        process.env.SWAGGER_DESCRIPTION ??
        'API documentation for Cadê Meu Rango',
    port: Number(process.env.PORT ?? 3000),
    apiVersion: process.env.API_VERSION ?? 'v0',
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    logoUrl:
        process.env.APP_LOGO_URL ??
        'https://res.cloudinary.com/dh39ahmpj/image/upload/v1683412274/favicons.dev/cade_meu_rango_nyjbxs.png',
};
