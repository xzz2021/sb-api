import { Controller, Get, Query } from '@nestjs/common';
import { RolesGuard } from 'src/allProcessor/guard/roles';
import { RoleArr } from 'src/allProcessor/guard/roles.enum';
import { OnlineplayerService } from './onlineplayer.service';
import { ApiTags } from '@nestjs/swagger';

@RolesGuard(RoleArr.Admin)  //  注明允许的身份
@ApiTags('在线玩家统计')
@Controller('onlineplayer')
export class OnlineplayerController {
  constructor(private readonly onlineplayerService: OnlineplayerService) {}

  @Get()
  findAll() {
    return this.onlineplayerService.findAll();
  }

  @Get('12hours')
  find12Hour() {
    return this.onlineplayerService.find12Hour();
  }

  //  获取指定日期数据
  @Get('specifyDate')
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
