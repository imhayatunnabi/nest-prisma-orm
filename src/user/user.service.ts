import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private mailService: MailService) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findAll() {
    /* email sending configuration start */
    const subject = "Get All User List Confirmed";
    const htmlContent = "<strong>This is the HTML content</strong>";
    const textContent = "This is the text content";
    const toEmail = "imhayatunnabi.pen@gmail.com";
    const toName = "Hayatunnabi Nabil Client";
    await this.mailService.sendEmail(subject, htmlContent, textContent, toEmail, toName);

    /* email sending configuration end */

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
