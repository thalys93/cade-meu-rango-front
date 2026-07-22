import { IsEmail, Matches, IsString, MinLength } from 'class-validator';
import { RegExHelper } from 'src/helpers/regex.helper';
import { messagesHelper } from 'src/helpers/messages.helper';

export class VerifyResetDto {
    @Matches(RegExHelper.email, { message: messagesHelper.emailMessage })
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    code: string;
}
