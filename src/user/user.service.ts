import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { extname, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const { password, ...userData } = createUserDto;

    let filePath: string | null = null;
    let uniqueFileName: string | null = null;

    if (file) {
      const uploadDir = 'uploads';
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
      }
      const fileExtension = extname(file.originalname);
      uniqueFileName = `${uuidv4()}${fileExtension}`;
      filePath = join(uploadDir, uniqueFileName);
      if (file.buffer && file.buffer.length > 0) {
        writeFileSync(filePath, file.buffer);
      } else {
        console.log('File buffer is null or empty.');
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        image: uniqueFileName,
      },
    });

    // Email sending configuration
    // const subject = 'Your account created successfully';
    // const htmlContent = '<strong>This is the HTML content</strong>';
    // const textContent = 'This is the text content';
    // const toEmail = user.email;
    // const toName = user.name;
    // await this.mailService.sendEmail(
    //   subject,
    //   htmlContent,
    //   textContent,
    //   toEmail,
    //   toName,
    // );

    return user;
  }

  async findAll(req: Request) {
    // Email sending configuration
    const subject = 'Get All User List Confirmed';
    const htmlContent = '<strong>This is the HTML content</strong>';
    const textContent = 'This is the text content';
    const toEmail = 'imhayatunnabi.pen@gmail.com';
    const toName = 'Hayatunnabi Nabil Client';
    await this.mailService.sendEmail(
      subject,
      htmlContent,
      textContent,
      toEmail,
      toName,
    );

    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      ...user,
      image: user.image
        ? `${req.protocol}://${req.get('host')}/${user.image}`
        : null,
    }));
  }

  async findOne(id: number, req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        articles: true,
        role: true,
      },
    });
    if (!user) return null;
    return {
      ...user,
      image: user.image
        ? `${req.protocol}://${req.get('host')}/${user.image}`
        : null,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto, req: Request) {
    const { password, ...userData } = updateUserDto;
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    await this.prisma.user.update({
      where: { id },
      data: {
        ...userData,
        password: hashedPassword,
      },
    });

    return this.findOne(id, req);
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
