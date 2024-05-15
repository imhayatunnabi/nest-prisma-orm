import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    description?: string;

    @IsNotEmpty()
    @ApiProperty({ required: true })
    body: string;

    @IsNotEmpty()
    @ApiProperty({ required: false, default: false })
    published?: boolean = false;
}
