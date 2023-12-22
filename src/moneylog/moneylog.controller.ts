import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoneylogService } from './moneylog.service';
import { CreateMoneylogDto } from './dto/create-moneylog.dto';
import { UpdateMoneylogDto } from './dto/update-moneylog.dto';

@Controller('moneylog')
export class MoneylogController {
  constructor(private readonly moneylogService: MoneylogService) {}

  @Post()
  create(@Body() createMoneylogDto: CreateMoneylogDto) {
    return this.moneylogService.create(createMoneylogDto);
  }

  // @Get()
  // findAll() {
  //   return this.moneylogService.findAll();
  // }

  @Get()
  findByCondition(@Query() joinQueryParams: {[string: string]: any}) {
    // Query 不传值 可以拿到 所有 查询 参数
    const { pageSize = 10, pageIndex= 1, ...searchParams } = joinQueryParams
    return this.moneylogService.findByCondition(pageSize,pageIndex, searchParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moneylogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoneylogDto: UpdateMoneylogDto) {
    return this.moneylogService.update(+id, updateMoneylogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moneylogService.remove(+id);
  }
}
