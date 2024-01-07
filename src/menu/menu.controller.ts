import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
import { sortMenuType } from './dto/menu.dto';
import { MenuService } from './menu.service';

  //  注明允许的身份
@ApiTags('菜单相关信息')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('getAllMenu') //  直接获取菜单列表  //  超级管理员测试使用
  @ApiOperation({summary: '获取所有菜单', description: '包含菜单详细信息,用于菜单管理'})
  getAllMenu() {
    return this.menuService.getAllMenu();
  }

  @Get('getMenuIdAndTitle') //  直接获取菜单列表  //  超级管理员测试使用
  @ApiOperation({summary: '获取菜单id和title', description: '只获取菜单id和title及parentId,用于新增菜单下拉选择'})
  getMenuIdAndTitle() {
    return this.menuService.getMenuIdAndTitle();
  }


  //  菜单编辑页面  新增 和 修改   同一  接口
  @Post('add')
  @ApiOperation({summary: '新增菜单', description: '用于添加新的菜单'})
  addMenu(@Body() menu: CreateMenuDto, ) {
    return this.menuService.addMenu(menu);
  }

  // @Post('modify')
  // modifyMenu(@Body() createMenuDto: CreateMenuDto) {
  //   return this.menuService.modifyMenu(createMenuDto);
  // }

  @Delete('delete:id')
  @ApiOperation({summary: '删除菜单', description: '暂时是单个删除菜单'})
  remove(@Param('id') id: number) {
    return this.menuService.removeMenu(id);
  }

  @Post('updateSort')
  @ApiOperation({summary: '菜单排序', description: '用于给顶级菜单排序'})
  updateSort(@Body() sortMenu: sortMenuType[]) {
    return this.menuService.updateSort(sortMenu);
  }

}
