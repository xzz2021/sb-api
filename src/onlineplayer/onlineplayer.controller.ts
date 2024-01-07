import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/allProcessor/guard/roles';
import { RoleArr } from 'src/allProcessor/guard/roles.enum';
import { OnlineplayerService } from './onlineplayer.service';

@RolesGuard(RoleArr.Admin)  //  注明允许的身份
@ApiTags('在线玩家统计')
@Controller('onlineplayer')
export class OnlineplayerController {
  constructor(private readonly onlineplayerService: OnlineplayerService) {}

  @Get()
  @ApiOperation({summary: '模拟数据生成', description: '生成模拟在线人数数据,测试使用,已关闭!'})
  findAll() {
    return this.onlineplayerService.findAll();
  }

  @Get('12hours')
  @ApiOperation({summary: '近12小时', description: '获取最近12小时的在线人数数据!'})
  find12Hour() {
    return this.onlineplayerService.find12Hour();
  }

  //  获取指定日期数据
  @Get('specifyDate')
  @ApiOperation({summary: '指定日期', description: '获取指定日期的在线人数数据!'})
  specifyDate(@Query() params: { unixtime: number } ) {
    const { unixtime }  = params;
    if(!unixtime) return null
    return this.onlineplayerService.specifyDate(unixtime);
  }


   //  获取指定日期数据
  //  @Get('specifyDate')
  //  specifyDate(@Query() params: { unixtime: number } ) {
  //    const { unixtime }  = params;
  //    if(!unixtime) return null
  //    return this.onlineplayerService.specifyDate(unixtime);
  //  }

}
