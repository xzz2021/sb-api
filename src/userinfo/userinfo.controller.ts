import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Req } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { JwtAuthGuard, LocalAuthGuard } from 'src/allProcessor/guard/auth.guard';

@Controller('userinfo')
export class UserinfoController {
   // 通过构造器传入 详细业务处理函数service
   constructor(
    private readonly userinfoService: UserinfoService,
    // private readonly logger: Logger,
    ) {
  }

  @Get('test')
    gettest(@Req() req: any){
      return 'hello test'
    }

  @Post('register1')  // 新增表格数据接口
    //  body后的dto定义传递过来的请求体数据格式
    // 如果前端数据体传递了其他未在dto定义的数据，将会被自动剔除
    test(@Body() userinfo: any, @Req() req: Request) {
      // createUsersDto.createtime = new Date().toLocaleString();
      console.log("🚀 ~ file: userinfo.controller.ts:22 ~ UserinfoController ~ test ~ userinfo:", userinfo)
      return userinfo
    }
  
  @Post('/findone')
  findOne(@Body('username') username: string) {
    return this.userinfoService.findOne(username);
  }
  


  // @UseGuards(JwtAuthGuard)
  // @Get('/getprofile/:id')
  // getprofile(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
  // // console.log("🚀 ~ file: userinfo.controller.ts:80 ~ UserinfoController ~ getprofile ~ id:", id)

  //   return this.userinfoService.getprofile(id);
  // }


  @UseGuards(JwtAuthGuard)
    @Get('getinfo')
    getInfo(@Req() req: any){
      // token解析出来的数据会在@Req中返回
      let userinfo = req.user
      return userinfo
    }


    // -----------------
    // 以下为注册登录认证代码
    @UseGuards(LocalAuthGuard)
    @Post('login')
    signIn(@Body() userinfo: any, @Req() req: Request){
      // 经过守卫返回的信息会自动放在req.user中
      // 如果上面守卫校验通过了,则会执行下面的登录返回token时间
      return this.userinfoService.login(userinfo)
    }

    // 使用nest内置的序列化拦截器,, 可以将返回数据的字段 进行过滤排除等(在数据的entity文件里定义)
    
    @Post('register')  // 新增表格数据接口
    //  body后的dto定义传递过来的请求体数据格式
    // 如果前端数据体传递了其他未在dto定义的数据，将会被自动剔除
    create(@Body() createUsersDto: any) {
      // createUsersDto.createtime = new Date().toLocaleString();
      return this.userinfoService.create(createUsersDto);
    }

}
