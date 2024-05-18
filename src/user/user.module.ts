import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { MailService } from "src/mail/mail.service";
import { MailModule } from "src/mail/mail.module";

@Module({
  controllers: [UserController],
  providers: [UserService, MailService],
  imports: [PrismaModule, MailModule]
})
export class UserModule {}
