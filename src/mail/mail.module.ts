import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        // transport: 'smtps://nest@neuralwebx.com:Nest@2024@mail.neuralwebx.com',
        transport: {
          host: 'mail.neuralwebx.com',
          port: 465,
          secure: false,
          auth: {
            user: 'nest@neuralwebx.com',
            pass: 'Nest@2024',
          },
          debug: true,
          logger: true
        },
        defaults: {
          from: `"No Reply" <imhayatunnabi@gmail.com>`,
        },
        template: {
          dir: join(__dirname, '../templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
