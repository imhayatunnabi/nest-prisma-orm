import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { RoleEntity } from './entities/role.entity';

@Controller('role')
@ApiTags('Role')
@UseGuards(JwtGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({ type: RoleEntity, isArray: true })
  async findAll() {
    const roles = await this.roleService.findAll();
    return roles.map((role) => new RoleEntity(role));
  }

  @Get(':id')
  @ApiOkResponse({ type: RoleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new RoleEntity(await this.roleService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: RoleEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: RoleEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.remove(+id);
  }
}
