import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MailService } from './mail.service';

// Módulo de envio de emails (email de confirmação, redefinição de senha, etc.)
// todo: usar o controller dos emails, para envio de emails !!
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}
}
