import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { JwtAuthGuard } from './allProcessor/guard/auth.guard';
import { RolesGuard } from './allProcessor/guard/role.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { EnumitemModule } from './enumitem/enumitem.module';
import { ItemreviewModule } from './itemreview/itemreview.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { UploadModule } from './upload/upload.module';
import { UserinfoModule } from './userinfo/userinfo.module';
// import * as Joi from 'joi'  // 引入字段校验,可以检验变量类型是否合法
// import {AppDataSource} from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from 'ormconfig';
import { GamelogModule } from './gamelog/gamelog.module';
import { LoggerModule } from './logger/logger.module';

// @Global()  //  使此app模块引入的依赖能够作为全局依赖应用到所有子模块
@Module({
  imports: [
    TypeOrmModule.forRoot({...typeormConfig}),
    // // 引入静态文件服务
    ServeStaticModule.forRoot({
      // 访问路径不需要目录名
      rootPath: join(__dirname, '../..', 'public/uploaded'),
      //  浏览器服务访问的前缀
      serveRoot: '/public/uploaded',
      //  未知功能
      // renderPath: '/xzz/',
    }),

    // 请求限流
    ThrottlerModule.forRoot({
      ttl: 10,  // 请求限制时间
      limit: 5, // 请求限制次数
    }),
    UserinfoModule, // 引入用户信息处理模块   链接相关功能

    LoggerModule,   //打印日志模块
     // 这里 各个模块都必须导入  不然 无法 请求到 相应模块的  接口
     RoleModule, DepartmentModule, MenuModule, EnumitemModule,  ItemreviewModule, UploadModule, GamelogModule // typeorm配置

  ],
  controllers: [AppController],
  providers: [AppService,
  // 添加全局  限流 守卫
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },
  {  //  全局注册 JWT token守卫    jwt一定要放在角色之前  因为要解析到 用户   才能拿到 角色
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
  { //  全局注册RBAC角色守卫  
    provide: APP_GUARD,
    useClass: RolesGuard
  },
  
],
})
export class AppModule {}
