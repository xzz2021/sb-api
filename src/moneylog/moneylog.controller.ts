import { Controller, Get, Query } from '@nestjs/common';
import { MoneylogService } from './moneylog.service';

@Controller('moneylog')
export class MoneylogController {
  constructor(private readonly moneylogService: MoneylogService) {}


  @Get()
  findByCondition(@Query() joinQueryParams: {[string: string]: any}) {
    // Query 不传值 可以拿到 所有 查询 参数
    const { pageSize = 10, pageIndex= 1, ...searchParams } = joinQueryParams
    return this.moneylogService.findByCondition(pageSize,pageIndex, searchParams);
  }

}
