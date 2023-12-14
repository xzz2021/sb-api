import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';
import { LocalStrategy } from './auth/local';
import { JwtStrategy } from './auth/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/userinfo.entity';
import { Roles } from 'src/role/entities/role.entity';
import { Menus } from 'src/menu/entities/menu.entity';

@Module({
  imports: [ 
    // 注意子模块被夫模块引用时   如果子模块service有调用数据库表格， 则此处必须进行对数据库表格引入进行枚举， TypeOrmModule.forFeature
    TypeOrmModule.forFeature([ Users, Roles, Menus ]),
    // TypeOrmModule.forRoot({autoLoadEntities: true,}),
    PassportModule,
    JwtModule.register({
      secret: 'TEMPsecret',
      signOptions: { expiresIn: '30d' }   //  设定token的有效期
    })
  ], //
  controllers: [UserinfoController],
  providers: [UserinfoService,  LocalStrategy, JwtStrategy],  // 引入自身service的同时引入local及jwt认证策略
})
export class UserinfoModule {}



// 为了模块不至于太分散，  用户查询及jwt认证功能结合在此单个模块中