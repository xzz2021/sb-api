import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/allProcessor/guard/auth.guard';
import { Public } from 'src/allProcessor/guard/public';
import { AvatorDto, DeleteIds, LoginDto, RegisterDto, RegisterResDto, UpdateDto, UpdateUserDto } from './dto/userinfo.dto';
import { UserinfoService } from './userinfo.service';

@ApiTags('用户信息')
@ApiBearerAuth()
@Controller('userinfo')
export class UserinfoController {
   // 通过构造器传入 详细业务处理函数service
   constructor(
    private readonly userinfoService: UserinfoService,
    ) {
  }
  // @Post('findone')
  // findOne(@Body('username') username: string) {
  //   return this.userinfoService.findOne(username);
  // }
  
  // @Get('getinfo')
  // getInfo(@Req() req: any){
  //     // token解析出来的数据会在@Req中返回
  //     let userinfo = req.user
  //     return userinfo
  //   }

  //   自定义 装饰器  使用 案例
  //   @Get('getinfo2')
  //   getInfo2(@getUser() user: any){
  //       // token解析出来的数据会在@Req中返回
  //       let userinfo = user
  //       return userinfo
  //     }


    // -----------------
    // 以下为注册登录认证代码
    @Public()
    @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({
    description: '用户登录',
    // type: Partial<User>
    })
    @ApiOperation({summary: '登录', description: '用户登录接口'})
    // @ApiBody({type: {username: xzz, password: 123}})
  signIn(@Body() userinfo: LoginDto){
      // 经过守卫返回的信息会自动放在req.user中
      
      // 如果上面守卫校验通过了,则会执行下面的登录返回token时间
      return this.userinfoService.login(userinfo)
    }
    
    // 使用nest内置的序列化拦截器,, 可以将返回数据的字段 进行过滤排除等(在数据的entity文件里定义)
    @Public()
    @ApiResponse({
      status: 200,
      type: RegisterResDto
    })
    @ApiOperation({summary: '注册', description: '用户注册接口'})
    @Post('register')  // 新增表格数据接口
    //  body后的dto定义传递过来的请求体数据格式
    // 如果前端数据体传递了其他未在dto定义的数据，将会被自动剔除
    create(@Body() registerDto: RegisterDto) {
      return this.userinfoService.create(registerDto);
    }

    // @Get('findAll')
    // findAll() {
    //   return this.userinfoService.findAllUser();
    // }


    // @Post('modify')  // 修改用户信息接口
    // modifyUser(@Body() createUsersDto: any) {
    //   return this.userinfoService.modifyUser(createUsersDto);
    // }

    @Post('updateUser')
    // @ApiParam({name: ''})
    // @ApiCreatedResponse({status: 200, description: '管理员新增或修改用户信息'})
    @ApiOperation({summary: '管理员修改信息', description: '管理员新增或修改用户信息'})

    updateUser(@Body() updateInfo: UpdateUserDto) {
      return this.userinfoService.updateUser(updateInfo);
    }

    @Post('update')
    // @ApiCreatedResponse({description: '用户修改个人信息'})
    @ApiOperation({summary: '修改个人信息', description: '用户修改个人信息'})
    update(@Body() newInfo: UpdateDto) {
      return this.userinfoService.updateSelf(newInfo);
    }

    @Post('updateAvator')
    // @ApiCreatedResponse({description: '用户更新个人头像'})
    @ApiOperation({summary: '修改头像', description: '用户更新个人头像'})
    updateAvator(@Body() newInfo: AvatorDto) {
      return this.userinfoService.updateAvator(newInfo);
    }


    @Post('delete') 
    @ApiOperation({summary: '删除用户', description: '单个或者批量删除用户'})
    // @ApiCreatedResponse({description: '批量删除用户'})
    deleteUser(@Body() data: DeleteIds) {
      return this.userinfoService.deleteUser(data.ids);
    }


    @Post('addUser')  // 新增表格数据接口
    @ApiOperation({summary: '新增用户', description: '管理员新增用户接口'})
    createUser(@Body() newUser: RegisterDto) {
      return this.userinfoService.createUser(newUser);
    }

}
