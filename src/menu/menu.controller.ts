import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Role } from 'src/allProcessor/guard/roles.enum';
import { Roles } from 'src/allProcessor/guard/roles';

  //  注明允许的身份
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Roles(Role.Admin)
  @Get('getAllMenu') //  直接获取菜单列表  //  超级管理员测试使用
  getAllMenu() {
    return this.menuService.getAllMenu();
  }

  //  菜单编辑页面  新增 和 修改   同一  接口
  @Roles(Role.SuperAdmin)  //  注明允许的身份
  @Post('add')
  addMenu(@Body() menu: CreateMenuDto, @Req() req: any) {
    const {  role } = req.user;
    return this.menuService.addMenu(menu, role);
  }

  @Roles(Role.SuperAdmin)  //  注明允许的身份
  @Post('modify')
  modifyMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.modifyMenu(createMenuDto);
  }

  @Roles(Role.SuperAdmin)  //  注明允许的身份
  @Delete('delete:id')
  remove(@Param('id') id: number) {
    return this.menuService.removeMenu(id);
  }
}
