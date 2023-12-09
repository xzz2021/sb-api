import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/allProcessor/guard/auth.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('getMenu')
  @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  //  这里使用Query  获取get请求的查询参数
  getMenu(@Query() query: any) {
    return this.roleService.getMenu(query.roleName);
  }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }
  //  这里是类似通配符匹配 'role/' 后面的所有路径
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
