import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test')
  getHello1(): string {
    return '校验token';
  }

  @Get('checkToken')
  checkToken(){
    // 如果能访问到此接口说明jwt验证通过了, 所以可以直接返回true
    return true
  }
}
