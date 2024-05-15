import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: UserEntity })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.userService.findOne(+id);
  }
  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })

  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: UserEntity })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.userService.remove(+id);
  }
}
