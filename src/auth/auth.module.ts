import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { LocalStrategy } from "./strategies/local-strategies";
import { MailService } from "src/mail/mail.service";

// export const jwtSecret = '61f785cefb1b16a2980b1608cde396d3fc4286b14f0900239b336d5489b778ab';
// export const jwtSecret = 'zjP9h6ZI5LoSKCRj';
export const jwtSecret = process.env.JWT_SECRET;

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '30d' }, // e.g. 30s, 7d, 24h
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, MailService],
})
export class AuthModule { }
