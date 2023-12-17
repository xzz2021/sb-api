import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.moneylogService.findAll();
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
