import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendUserWelcomeMessage(user: User) {
        try {
            await this.mailerService.sendMail({
                to: user.email,
                from: '"Support Team" <support@example.com>',
                subject: 'Welcome to Nice App!',
                template: './mail/templates/confirmation', // Adjust the path accordingly
                context: {
                    name: user.name,
                    // Any other template variables you want to pass
                },
            });
        } catch (error) {
            console.error('Error sending welcome email:', error);
        }
    }
}
