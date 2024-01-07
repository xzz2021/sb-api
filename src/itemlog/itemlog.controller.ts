import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ItemlogService } from './itemlog.service';

@ApiTags('游戏物品日志')
@Controller('itemlog')
export class ItemlogController {
  constructor(private readonly itemlogService: ItemlogService) {}

  @Get()
  @ApiOperation({summary: '获取物品日志', description: '只读数据库的表格'})
  findByCondition(@Query() joinQueryParams: {[string: string]: any}) {
    // Query 不传值 可以拿到 所有 查询 参数
    const { pageSize = 10, pageIndex= 1, ...searchParams } = joinQueryParams
    return this.itemlogService.findByCondition(pageSize,pageIndex, searchParams);
  }

}
