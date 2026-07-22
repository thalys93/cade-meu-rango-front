import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import { appConfig } from 'src/config/app.config';

type TemplateVars = Record<string, string | number>;

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    private async getTransporter() {
        const driver = String(process.env.MAIL_DRIVER || 'smtp').toLowerCase();

        if (driver === 'ethereal') {
            const testAccount = await nodemailer.createTestAccount();
            this.logger.log(`Usando driver Ethereal: ${testAccount.user}`);
            return nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: { user: testAccount.user, pass: testAccount.pass },
            });
        }

        if (driver === 'console') {
            this.logger.log(
                'Usando driver Console (sem envio, apenas imprime).',
            );
            return nodemailer.createTransport({
                streamTransport: true,
                newline: 'unix',
                buffer: true,
            });
        }

        const host = process.env.MAIL_HOST;
        const port = Number(process.env.MAIL_PORT || 587);
        const secure = String(process.env.MAIL_SECURE || 'false') === 'true';
        const user = process.env.MAIL_USER;
        const pass = process.env.MAIL_PASS;

        if (!host || !user || !pass) {
            this.logger.error('MAIL_HOST/MAIL_USER/MAIL_PASS não configurados');
            throw new Error('Configuração de SMTP ausente');
        }

        this.logger.log(`Usando driver SMTP: ${host}:${port} secure=${secure}`);
        return nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        });
    }

    private resolveTemplatePath(templateName: string): string {
        const candidates = [
            path.join(__dirname, 'templates', templateName),
            path.join(process.cwd(), 'src', 'mail', 'templates', templateName),
        ];

        for (const candidate of candidates) {
            if (fs.existsSync(candidate)) {
                return candidate;
            }
        }

        return '';
    }

    private applyVars(raw: string, variables: TemplateVars): string {
        let out = raw.replace(
            /{{#if\s+(\w+)}}([\s\S]*?){{\/?if}}/g,
            (_, key, inner) => {
                const v = variables[key];
                return v ? inner : '';
            },
        );
        out = out.replace(/{{\s*(\w+)\s*}}/g, (_, key) =>
            String(variables[key] ?? ''),
        );
        return out;
    }

    private renderTemplate(
        templateName: string,
        variables: TemplateVars,
    ): string {
        const templatePath = this.resolveTemplatePath(templateName);

        if (!templatePath) {
            this.logger.warn(
                `Template ${templateName} não encontrado, usando fallback inline.`,
            );
            return `<!doctype html><html><body>
                <h2>${appConfig.name}</h2>
                <p>${String(variables.message ?? variables.code ?? '')}</p>
            </body></html>`;
        }

        return this.applyVars(fs.readFileSync(templatePath, 'utf8'), variables);
    }

    private renderWithLayout(
        contentTemplate: string,
        variables: TemplateVars,
        pageTitle = '',
    ): string {
        const body = this.renderTemplate(contentTemplate, variables);
        return this.renderTemplate('layout.hbs', {
            appName: appConfig.name,
            pageTitle,
            logoUrl: appConfig.logoUrl,
            body,
        });
    }

    async sendMail(to: string, subject: string, html: string) {
        const driver = String(process.env.MAIL_DRIVER || 'smtp').toLowerCase();
        const from =
            process.env.MAIL_FROM ||
            process.env.MAIL_USER ||
            'no-reply@localhost';

        const logInfo = (info: nodemailer.SentMessageInfo, drv: string) => {
            if (drv === 'ethereal') {
                const url = nodemailer.getTestMessageUrl(info);
                this.logger.log(
                    `Email (Ethereal) enviado para ${to} — preview: ${url}`,
                );
            } else if (drv === 'console') {
                const raw = info.message?.toString?.() || '';
                this.logger.log(
                    `Email (Console) para ${to} — assunto: ${subject}\n${raw}`,
                );
            } else {
                this.logger.log(
                    `Email enviado para ${to} — assunto: ${subject}`,
                );
            }
        };

        try {
            const transporter = await this.getTransporter();
            const info = await transporter.sendMail({
                from,
                to,
                subject,
                html,
            });
            logInfo(info, driver);
        } catch (err: unknown) {
            const error = err as { message?: string; code?: string };
            const msg = error?.message || String(err);
            const code = error?.code;
            this.logger.error(
                `Falha ao enviar email (driver=${driver}): ${msg}`,
            );
            const recoverable =
                code === 'EAUTH' ||
                code === 'ETIMEDOUT' ||
                code === 'ECONNRESET' ||
                /Unexpected socket close/i.test(msg);

            if (!recoverable || driver === 'console') {
                throw err;
            }

            this.logger.warn(
                'Aplicando fallback para driver console (apenas imprime no terminal).',
            );
            const consoleTransporter = nodemailer.createTransport({
                streamTransport: true,
                newline: 'unix',
                buffer: true,
            });
            const info = await consoleTransporter.sendMail({
                from,
                to,
                subject,
                html,
            });
            logInfo(info, 'console');
        }
    }

    async sendPasswordResetMail(email: string, code: string) {
        const subject = `${appConfig.name} — Recuperação de senha`;
        const html = this.renderWithLayout(
            'password-reset.hbs',
            { code },
            'Recuperação de senha',
        );
        await this.sendMail(email, subject, html);
    }

    async sendWelcomeMail(to: string) {
        const html = this.renderWithLayout(
            'welcome-user.hbs',
            {
                email: to,
                loginUrl: appConfig.frontendUrl,
            },
            'Boas-vindas',
        );
        await this.sendMail(to, `Bem-vindo(a) ao ${appConfig.name}`, html);
    }

    async sendNotificationMail(to: string, title: string, message: string) {
        const html = this.renderWithLayout(
            'notification.hbs',
            { title, message },
            title,
        );
        await this.sendMail(to, title, html);
    }
}
