import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
    @ApiProperty()
    id: number;

    @ApiProperty({ required: true, nullable: false })
    name: string;

    @ApiProperty({ required: true, nullable: false })
    email: string;

    @ApiProperty({ required: true, nullable: false })
    password: string;

    @ApiProperty()
    createdAt: Date;

    @Exclude()
    updatedAt: Date;

}
