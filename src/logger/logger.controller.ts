import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogService } from './logger.service';

  //  注明允许的身份
@ApiTags('操作日志')
@Controller('logger')
export class LoggerController {
  constructor(private readonly logService: LogService) {}

  @Get('getAllLog') 
  @ApiOperation({summary: '获取日志', description: '获取所有操作记录的日志信息'})
  getAllLog() {
    return this.logService.getAllLog();
  }

  //  菜单编辑页面  新增 和 修改   同一  接口
  @Post('add')
  @ApiOperation({summary: '新增日志', description: '用于添加新的日志信息'})
  addMenu(@Body() newLog: any, ) {
    return this.logService.addLog(newLog);
  }
}
