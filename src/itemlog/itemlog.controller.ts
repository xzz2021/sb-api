import { Controller, Get, Query } from '@nestjs/common';
import { ItemlogService } from './itemlog.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('游戏物品日志')
@Controller('itemlog')
export class ItemlogController {
  constructor(private readonly itemlogService: ItemlogService) {}

  @Get()
  findByCondition(@Query() joinQueryParams: {[string: string]: any}) {
    // Query 不传值 可以拿到 所有 查询 参数
    const { pageSize = 10, pageIndex= 1, ...searchParams } = joinQueryParams
    return this.itemlogService.findByCondition(pageSize,pageIndex, searchParams);
  }

}
