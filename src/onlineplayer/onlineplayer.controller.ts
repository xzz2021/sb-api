import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { OnlineplayerService } from './onlineplayer.service';
import { CreateOnlineplayerDto } from './dto/create-onlineplayer.dto';
import { Role } from 'src/allProcessor/guard/roles.enum';
import { Roles } from 'src/allProcessor/guard/roles';
import { Public } from 'src/allProcessor/guard/public';

@Roles(Role.Admin)  //  注明允许的身份
@Controller('onlineplayer')
export class OnlineplayerController {
  constructor(private readonly onlineplayerService: OnlineplayerService) {}

  @Post()
  create(@Body() createOnlineplayerDto: CreateOnlineplayerDto) {
    return this.onlineplayerService.create(createOnlineplayerDto);
  }

  @Public()  //  因为添加了 全局 jwt 守卫, 此处 定义为公共接口  无需 认证
  // @UseGuards(JwtAuthGuard)
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

}
