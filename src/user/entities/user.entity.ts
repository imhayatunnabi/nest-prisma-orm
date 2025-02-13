import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { RoleEntity } from 'src/role/entities/role.entity';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roleId: number;

  @ApiProperty({ required: true, nullable: false })
  name: string;

  @ApiProperty({ required: true, nullable: false })
  email: string;

  @ApiProperty({ required: true, nullable: false })
  image: string;

  @ApiProperty({ required: true, nullable: false })
  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, type: RoleEntity })
  @Transform(({ value }) => (value ? new RoleEntity(value) : undefined))
  role?: RoleEntity;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
    if (partial.role) {
      this.role = new RoleEntity(partial.role);
    }
  }
}
