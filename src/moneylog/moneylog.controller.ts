import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MoneylogService } from './moneylog.service';

@ApiTags('游戏金钱日志')
@Controller('moneylog')
export class MoneylogController {
  constructor(private readonly moneylogService: MoneylogService) {}


  @Get()
  @ApiOperation({summary: '获取金钱日志', description: '只读数据库的表格'})
  findByCondition(@Query() joinQueryParams: {[string: string]: any}) {
    // Query 不传值 可以拿到 所有 查询 参数
    const { pageSize = 10, pageIndex= 1, ...searchParams } = joinQueryParams
    return this.moneylogService.findByCondition(pageSize,pageIndex, searchParams);
  }

}
