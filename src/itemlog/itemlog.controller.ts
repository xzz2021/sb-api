import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemlogService } from './itemlog.service';
import { CreateItemlogDto } from './dto/create-itemlog.dto';
import { UpdateItemlogDto } from './dto/update-itemlog.dto';

@Controller('itemlog')
export class ItemlogController {
  constructor(private readonly itemlogService: ItemlogService) {}

  @Post()
  create(@Body() createItemlogDto: CreateItemlogDto) {
    return this.itemlogService.create(createItemlogDto);
  }

  // @Get()
  // findAll() {
  //   return this.itemlogService.findAll();
  // }
  @Get()
  findByCondition(@Query() joinQueryParams: {[string: string]: any}) {
    // Query 不传值 可以拿到 所有 查询 参数
    const { pageSize = 10, pageIndex= 1, ...searchParams } = joinQueryParams
    return this.itemlogService.findByCondition(pageSize,pageIndex, searchParams);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemlogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemlogDto: UpdateItemlogDto) {
    return this.itemlogService.update(+id, updateItemlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemlogService.remove(+id);
  }
}
