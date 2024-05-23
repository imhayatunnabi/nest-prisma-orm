import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserEntity } from "./entities/user.entity";
import { JwtGuard } from "src/auth/guard/jwt-auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from 'express';
import { User } from "src/auth/user/user.decorator";

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() image: Express.Multer.File, @User() user: any) {
    return user;
    return new UserEntity(await this.userService.create(createUserDto, image));
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(@Req() req: Request) {
    const users = await this.userService.findAll(req);
    return users.map((user) => new UserEntity(user));
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return new UserEntity(await this.userService.findOne(id, req));
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request
  ) {
    return new UserEntity(await this.userService.update(id, updateUserDto, req));
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiOkResponse({ type: UserEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new UserEntity(await this.userService.remove(id));
  }
}
