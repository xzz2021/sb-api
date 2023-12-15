import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/allProcessor/guard/auth.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // @Get('getMenu') //  获取用户的菜单
  // @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  // //  这里使用Query  获取get请求的查询参数
  // // getMenu(@Query() query: any) {
  // //   return this.roleService.getMenu(query.rolesArr);
  // // }
  // getMenu(@Req() req: any) {
  //   const { username, rolesArr } = req.user;
  //   return this.roleService.getMenu(rolesArr);
  // }


  // 获取所有角色信息
  @Get('getRoletable')
  getRoletable(){
    return this.roleService.findAllRoles();
  }

  @Get('list') // 根据角色 获取用户的菜单 以及  权限
  @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  getMenuAndPermission(@Req() req: any) {
    const { username, rolesArr } = req.user;
    return this.roleService.getMenuAndPermission(rolesArr);
  }
  


  //  添加角色
  @Post('addRole')
  addRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.addRole(createRoleDto);
  }


  //  删除角色
  @Delete(':id')
  removeRole(@Param('id') id: number) {
    return this.roleService.removeRole( id )
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
