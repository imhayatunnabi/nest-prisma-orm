import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ArticleModule } from "./article/article.module";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { RoleModule } from "./role/role.module";

@Module({
  imports: [PrismaModule, AuthModule, ArticleModule, UserModule, MailModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
