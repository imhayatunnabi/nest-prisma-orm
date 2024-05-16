import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserWelcomeMessage(user: User) {
        // const url = `example.com/auth/confirm?token=${token}`;

        await this.mailerService.sendMail({
            to: user.email,
            from: '"Support Team" <support@example.com>',
            subject: 'Welcome to Nice App!',
            template: './confirmation',
            context: {
                name: user.name,
                // url,
            },
        });
    }
}
