import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });

    const sentFrom = new Sender("imhayatunnabi.pen@gmail.com", "Your name");

    const recipients = [
      new Recipient("imhayatunnabi.pen@gmail.com", "Your Client")
    ];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("This is a Subject")
      .setHtml("<strong>This is the HTML content</strong>")
      .setText("This is the text content");

    await mailerSend.email.send(emailParams);

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }


  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        articles: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, ...userData } = updateUserDto;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.prisma.user.update({
        where: { id },
        data: {
          ...userData,
          password: hashedPassword,
        },
      });
    } else {
      await this.prisma.user.update({
        where: { id },
        data: userData,
      });
    }

    return this.findOne(id);
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
