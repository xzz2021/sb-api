import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from 'src/allProcessor/guard/auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}


  @Get('getAllMenu') //  直接获取菜单列表  //  超级管理员测试使用
  getAllMenu() {
    return this.menuService.getAllMenu();
  }

  // // 尝试返回真实菜单数据
  // @Get('getAllMenu222') //  获取用户的菜单
  // getAllMenu222() {
  //   return this.menuService.getAllMenu222();
  // }

  //  菜单编辑页面  新增 和 修改   同一  接口
  @Post('add')
  @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  addMenu(@Body() menu: CreateMenuDto, @Req() req: any) {
    const {  role } = req.user;
    return this.menuService.addMenu(menu, role);
  }

  @Post('modify')
  modifyMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.modifyMenu(createMenuDto);
  }


  // 根据解析到的用户角色信息 获取 菜单
  //  此处只是返回用户菜单  不带权限表
  // @Get('getMenu') //  获取用户的菜单
  // @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  // getMenu(@Req() req: any) {
  //   const { username, rolesArr } = req.user;
  //   return this.menuService.getMenu(rolesArr);
  // }

  // @Get('getMenuAndPermission') //  获取用户的菜单
  // @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  // getMenuAndPermission(@Req() req: any) {
  //   const { username, rolesArr } = req.user;
  //   return this.menuService.getMenuAndPermission(rolesArr);
  // }

  

  @Post()
  createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create();
  }

  @Post()
  create(@Body() createPermissionDto: CreateMenuDto) {
    return this.menuService.create();
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdateMenuDto) {
    return this.menuService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }


}
