import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { debug } from 'console';

@Injectable()
export class MailService {
    logger: any;
    constructor(private mailerService: MailerService) { }

    async sendUserWelcomeMessage(user: User) {
        try {
            // logger: true
            // debug: true
            // this.logger.log(`Starting ${user.email}`)
            await this.mailerService.sendMail({
                to: user.email,
                from: '"Support Team" <support@example.com>',
                subject: 'Welcome to Nice App!',
                template: 'confirmation',
                context: {
                    name: user.name,
                },
            });
            // this.logger.log('Mail Sent')
        } catch (error) {
            console.error('Error sending welcome email:', error.stack);
        }
    }
}
