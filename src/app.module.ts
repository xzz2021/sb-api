import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
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
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeormConfig } from 'ormconfig';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamicdbModule } from './dynamicdb/dynamicdb.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
// import { DynamicdbModule } from './dynamicdb/dynamicdb.module';
// console.log('🚀 ~ file: app.module.ts:25 ~ process.env.NODE_ENV:', process.env)
// @Global()  //  使此app模块引入的依赖能够作为全局依赖应用到所有子模块
@Module({
  imports: [
    // ConfigModule.forRoot(),  //引入后 才能读取.env文件
    TypeOrmModule.forRoot(typeormConfig),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) =>
    //     {
    //       return {  
    //         type: config.get('TYPE'),
    //         host: config.get('HOST'),
    //         port: config.get('PORT'),
    //         username: config.get('DBUSER'),
    //         password: config.get('PWD'),
    //         database: config.get('DB'),
    //         synchronize: false,
    //         autoLoadEntities: true,
    //         // entities: allEntities,
    //       } as TypeOrmModuleOptions

    //     }
    // }),
    // // 引入静态文件服务
    ServeStaticModule.forRoot({
      // 访问路径不需要目录名
      rootPath: join(__dirname, `${process.env?.NODE_ENV == 'production' ? '...':'../..'}`,
       `${process.env?.NODE_ENV == 'production' ? 'src/public/uploaded':'public/uploaded'}`),
      //  打包后的 根目录  需根据路径调整
      // rootPath: (0, path_1.join)(__dirname, '..', 'src/public/uploaded'),
      
      //  浏览器服务访问的前缀
      serveRoot: '/public/uploaded',
      //  未知功能
      // renderPath: '/xzz/',
    }),

    CacheModule.register({ttl: 15 * 1000,   max: 100 }), // 引入缓存模块

    // 请求限流
    ThrottlerModule.forRoot({
      ttl: 10,  // 请求限制时间
      limit: 5, // 请求限制次数
    }),
    UserinfoModule, // 引入用户信息处理模块   链接相关功能

    LoggerModule,   //打印日志模块
     // 这里 各个模块都必须导入  不然 无法 请求到 相应模块的  接口
     RoleModule, DepartmentModule, MenuModule, EnumitemModule,  
     ItemreviewModule, UploadModule, 
    //  DynamicdbModule,
      // GamelogModule 

  ],
  controllers: [AppController],
  // providers 里的内容 用于 提供 给  controller 使用
  providers: [
    AppService,
    // 全局启用缓存模块
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    //上面 等同于  简化写法
    // {
    //   provide: CatsService,
    //   useClass: CatsService,    //useClass  允许动态确定令牌应解析的类
    // },
    // 另一种是直接提供值     这里声明的键值 是可以作为可注入项导入其他类的
    // constructor(@Inject('CONNECTION') connection: Connection) {}
    // {
    //   provide: 'CONNECTION',
    //   useValue: connection,
    // },
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
