import { Injectable, Logger } from "@nestjs/common";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

@Injectable()
export class MailService {
  private readonly mailerSend: MailerSend;
  private readonly defaultSenderEmail: string;
  private readonly defaultSenderName: string;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });
    this.defaultSenderEmail = process.env.EMAIL_SENDER_EMAIL;
    this.defaultSenderName = process.env.EMAIL_SENDER_NAME;
  }

  async sendEmail(subject: string, htmlContent: string, textContent: string, toEmail: string, toName: string) {
    try {
      const sentFrom = new Sender(this.defaultSenderEmail, this.defaultSenderName);
      const recipients = [new Recipient(toEmail, toName)];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject(subject)
        .setHtml(htmlContent)
        .setText(textContent);

      await this.mailerSend.email.send(emailParams);
      Logger.log(`Email sent successfully to ${toEmail}`);
    } catch (error) {
      Logger.error(`Error sending email: ${error.message}`);
      throw new Error('Failed to send email');
    }
  }
}
