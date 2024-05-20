import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class RoleEntity implements Role {
    constructor(partial: Partial<RoleEntity>) {
        Object.assign(this, partial);
    }
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
