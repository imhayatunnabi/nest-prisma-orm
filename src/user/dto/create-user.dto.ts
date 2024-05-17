import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'imhayatunnabi' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'imhayatunnabi@gmail.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ default: 'P@@$$word' })
    password: string;

    @ApiProperty({ type: 'string', format: 'binary', required: false, default: 'profile-pic.png' })
    image?: any;
}
