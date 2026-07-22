import { IsEmail, Matches } from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';
import { messagesHelper } from 'src/helpers/messages.helper';

export class ForgotPasswordDto {
    @Matches(RegExHelper.email, { message: messagesHelper.emailMessage })
    @IsEmail()
    email: string;
}
