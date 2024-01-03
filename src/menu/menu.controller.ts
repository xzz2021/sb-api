import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

  //  注明允许的身份
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('getAllMenu') //  直接获取菜单列表  //  超级管理员测试使用
  getAllMenu() {
    return this.menuService.getAllMenu();
  }


  //  菜单编辑页面  新增 和 修改   同一  接口
  @Post('add')
  addMenu(@Body() menu: CreateMenuDto, ) {
    return this.menuService.addMenu(menu);
  }

  // @Post('modify')
  // modifyMenu(@Body() createMenuDto: CreateMenuDto) {
  //   return this.menuService.modifyMenu(createMenuDto);
  // }

  @Delete('delete:id')
  remove(@Param('id') id: number) {
    return this.menuService.removeMenu(id);
  }
}
