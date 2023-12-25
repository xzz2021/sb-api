import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { LocalAuthGuard } from 'src/allProcessor/guard/auth.guard';
import { Public } from 'src/allProcessor/guard/public';

@Controller('userinfo')
export class UserinfoController {
   // 通过构造器传入 详细业务处理函数service
   constructor(
    private readonly userinfoService: UserinfoService,
    ) {
  }

  @Get('test')
    gettest(@Req() req: any){
      return 'hello test'
    }

  @Post('findone')
  findOne(@Body('username') username: string) {
    return this.userinfoService.findOne(username);
  }
  
  @Get('getinfo')
  getInfo(@Req() req: any){
      // token解析出来的数据会在@Req中返回
      let userinfo = req.user
      return userinfo
    }


    // -----------------
    // 以下为注册登录认证代码
    @Public()
    @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() userinfo: any, @Req() req: Request){
      console.log('🚀 ~ file: userinfo.controller.ts:38 ~ UserinfoController ~ signIn ~ userinfo:', userinfo)
      // 经过守卫返回的信息会自动放在req.user中
      // 如果上面守卫校验通过了,则会执行下面的登录返回token时间
      return this.userinfoService.login(userinfo)
    }
    
    // 使用nest内置的序列化拦截器,, 可以将返回数据的字段 进行过滤排除等(在数据的entity文件里定义)
    @Public()
    @Post('register')  // 新增表格数据接口
    //  body后的dto定义传递过来的请求体数据格式
    // 如果前端数据体传递了其他未在dto定义的数据，将会被自动剔除
    create(@Body() createUsersDto: any) {
      return this.userinfoService.create(createUsersDto);
    }

    @Get('findAll')
    findAll() {
      return this.userinfoService.findAllUser();
    }


    @Post('modify')  // 修改用户信息接口
    modifyUser(@Body() createUsersDto: any) {
      return this.userinfoService.modifyUser(createUsersDto);
    }


    //  管理员 新增   或 修改  用户 信息   同一接口
    @Post('updateUser')
    updateUser(@Body() createUsersDto: any) {
      return this.userinfoService.updateUser(createUsersDto);
    }


    @Post('delete')  // 修改用户信息接口
    deleteUser(@Body() data: {ids: number[]}) {
      return this.userinfoService.deleteUser(data.ids);
    }

}
