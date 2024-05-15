import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, ArticleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
