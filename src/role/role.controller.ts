import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@ApiTags('角色相关信息')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // 获取所有角色信息   此处用于获取所有角色  以及角色 关联 的children菜单menusArr 以及meta里的permission  用于回显
  @Get('getRoletable')
    @ApiOperation({summary: '获取所有角色', description: '用于获取所有角色及其关联菜单和权限'})
  getRoletable2(){
    return this.roleService.findAllRoles();
  }

//  此处 只获取角色 id 及 角色  名称  用于 下拉  并返回  id用于更新用户信息
@Get('getRoleListId')
    @ApiOperation({summary: '获取角色id和名称', description: '只获取角色id和名称,用于用户管理的信息回显'})
  getRoleListId(){
    return this.roleService.findAllRolesId();
  }

  @Get('getMenu') // 根据角色 获取用户的菜单 以及  权限
    @ApiOperation({summary: '根据角色获取用户菜单', description: '根据角色获取用户菜单及相关权限'})
    getMenuAndPermission(@Req() req: any) {
    const { roleName } = req.user;
    return this.roleService.getMenuByRole(roleName);
  }
  
  //  添加角色
  @Post('addRole')
  @ApiOperation({summary: '新增角色', description: '用于添加新的角色或者更新已有角色信息'})
  addRole(@Body() createRoleDto: AddRoleDto) {
    return this.roleService.addRole(createRoleDto);
  }

  //  删除角色
  @Delete(':id')
  @ApiOperation({summary: '删除角色', description: '用于删除已有角色'})
  removeRole(@Param('id') id: number) {
    return this.roleService.removeRole( id )
  }
}
