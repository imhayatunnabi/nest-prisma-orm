//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class AuthEntity {
    @ApiProperty()
    user: User
    @ApiProperty()
    accessToken: string;
}