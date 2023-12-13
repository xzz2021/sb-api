import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionListService } from './permission-list.service';
import { CreatePermissionListDto } from './dto/create-permission-list.dto';
import { UpdatePermissionListDto } from './dto/update-permission-list.dto';

@Controller('permission-list')
export class PermissionListController {
  constructor(private readonly permissionListService: PermissionListService) {}

  @Post()
  create(@Body() createPermissionListDto: CreatePermissionListDto) {
    return this.permissionListService.create(createPermissionListDto);
  }

  @Get()
  findAll() {
    return this.permissionListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionListDto: UpdatePermissionListDto) {
    return this.permissionListService.update(+id, updatePermissionListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionListService.remove(+id);
  }
}
