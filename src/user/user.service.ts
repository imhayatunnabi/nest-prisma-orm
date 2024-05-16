import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
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
    await this.mailService.sendUserWelcomeMessage(user);

    return user;
  }

  async findAll() {
    const user = await this.prisma.user.findFirst({
      where: {
        email: 'imhayatunnabi@gmail.com'
      }
    });
    if (user) {
      await this.mailService.sendUserWelcomeMessage(user);
    }
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
