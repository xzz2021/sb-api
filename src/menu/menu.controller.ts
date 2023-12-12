import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}


  @Get('getAllMenu') //  获取用户的菜单
  getAllMenu() {
    return this.menuService.getAllMenu();
  }

  @Post('add')
  addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.addMenu(createMenuDto);
  }


  @Post()
  createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Post()
  create(@Body() createPermissionDto: CreateMenuDto) {
    return this.menuService.create(createPermissionDto);
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
