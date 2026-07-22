import { IsEmail, Matches, IsString, MinLength } from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';
import { messagesHelper } from 'src/helpers/messages.helper';

export class ResetPasswordDto {
    @Matches(RegExHelper.email, { message: messagesHelper.emailMessage })
    @IsEmail()
    email: string;

    @Matches(RegExHelper.password, { message: messagesHelper.passwordMessages })
    @IsString()
    @MinLength(8)
    password: string;
}
