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
import { Departments } from 'src/department/entities/department.entity';
import { RoleService } from 'src/role/role.service';
import { DepartmentService } from 'src/department/department.service';
import { MenuService } from 'src/menu/menu.service';
import { Metas } from 'src/menu/entities/meta.entity';

@Module({
  imports: [ 
    // 注意子模块被夫模块引用时   如果子模块service有调用数据库表格， 则此处必须进行对数据库表格引入进行枚举， TypeOrmModule.forFeature
    TypeOrmModule.forFeature([ Users, Roles, Menus, Departments, Metas ]),
    // TypeOrmModule.forRoot({autoLoadEntities: true,}),
    PassportModule,
    JwtModule.register({
      secret: 'TEMPsecret',
      signOptions: { expiresIn: '3d' }   //  设定token的有效期
    })
  ], //
  controllers: [UserinfoController],
  //  引用外部  service  时  需要 在 此处定义  且 对应的数据库 定义  entity 也需要一起拿来
  providers: [UserinfoService, RoleService, DepartmentService,MenuService, LocalStrategy, JwtStrategy, ],  // 引入自身service的同时引入local及jwt认证策略
})
export class UserinfoModule {}



// 为了模块不至于太分散，  用户查询及jwt认证功能结合在此单个模块中