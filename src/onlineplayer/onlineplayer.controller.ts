import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OnlineplayerService } from './onlineplayer.service';
import { CreateOnlineplayerDto } from './dto/create-onlineplayer.dto';
import { UpdateOnlineplayerDto } from './dto/update-onlineplayer.dto';
import { JwtAuthGuard } from 'src/allProcessor/guard/auth.guard';
import { RolesGuard } from 'src/allProcessor/guard/role.guard';
import { Role } from 'src/allProcessor/guard/roles.enum';
import { Roles } from 'src/allProcessor/guard/roles';
import { Public } from 'src/allProcessor/guard/public';

// @Roles(Role.Admin)  //  注明允许的身份
// @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
@Controller('onlineplayer')
export class OnlineplayerController {
  constructor(private readonly onlineplayerService: OnlineplayerService) {}

  @Post()
  create(@Body() createOnlineplayerDto: CreateOnlineplayerDto) {
    return this.onlineplayerService.create(createOnlineplayerDto);
  }

  @Public()
  @UseGuards(JwtAuthGuard)
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
