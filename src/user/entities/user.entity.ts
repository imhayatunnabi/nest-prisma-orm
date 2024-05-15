import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity implements User {
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

    @ApiProperty()
    updatedAt: Date;

}
