import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GamelogService } from './gamelog.service';

@ApiTags('游戏日志总入口')
@Controller('gamelog')
export class GamelogController {
  constructor(private readonly gamelogService: GamelogService) {}

  @Get('item')
  @ApiOperation({summary: '获取物品日志', description: '只读数据库的表格'})
  findItem(@Query() joinQueryParams: {[string: string]: any}) {
    // Query 不传值 可以拿到 所有 查询 参数
    const { pageSize = 10, pageIndex= 1, ...searchParams } = joinQueryParams
    return this.gamelogService.findItem(pageSize,pageIndex, searchParams);
  }

  @Get('money')
  @ApiOperation({summary: '获取金钱日志', description: '只读数据库的表格'})
  findMoney(@Query() joinQueryParams: {[string: string]: any}) {
    // Query 不传值 可以拿到 所有 查询 参数
    const { pageSize = 10, pageIndex= 1, ...searchParams } = joinQueryParams
    return this.gamelogService.findMoney(pageSize,pageIndex, searchParams);
  }

  @Get('onlinePlayer')
  @ApiOperation({summary: '模拟数据生成', description: '生成模拟在线人数数据,测试使用,已关闭!'})
  findAll() {
    return this.gamelogService.findAllOnlineplayer();
  }

  @Get('onlinePlayer/12hours')
  @ApiOperation({summary: '近12小时', description: '获取最近12小时的在线人数数据!'})
  find12Hour() {
    return this.gamelogService.find12Hour();
  }

  //  获取指定日期数据
  @Get('onlinePlayer/specifyDate')
  @ApiOperation({summary: '指定日期', description: '获取指定日期的在线人数数据!'})
  specifyDate(@Query() params: { unixtime: number } ) {
    const { unixtime }  = params;
    if(!unixtime) return null
    return this.gamelogService.specifyDate(unixtime);
  }
}
