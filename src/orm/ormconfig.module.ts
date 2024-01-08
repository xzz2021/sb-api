

//  需要把配置信息改造成单独的ts文件进行引用,  见底部模板

import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Departments } from '../department/entities/department.entity';
import { Enumitem } from '../enumitem/entities/enumitem.entity';
import { Itemreview } from '../itemreview/entities/itemreview.entity';
import { Menus } from '../menu/entities/menu.entity';
import { Metas } from '../menu/entities/meta.entity';
import { MetaPermission } from '../role/entities/permission.entity';
import { Roles } from '../role/entities/role.entity';
import { Users } from '../userinfo/entities/userinfo.entity';

import * as config from 'config';
const db1 = config.get('db1')
// const  db2  = config.get('db2')
let allEntities = [ Users, Roles, Menus, Departments, Metas, Enumitem, Itemreview, MetaPermission ]
const  dev  = config.get('dev')


@Module({

    imports: [

        TypeOrmModule.forRootAsync({
            name: 'default',
            useFactory: () =>({
              name: 'default',
              type: 'mysql',
              host: db1.host,
              port: db1.post,
              username: db1.user,
              password: db1.pwd,
              database: 'shengbai',
              entities: allEntities,
              // entities: ['dist/**/entities/*.entity{.ts,.js}'],
              // migrations: ['../migrations/*{.ts,.js}'],
  //             "factories": ["dist/**/database/factories/**/*.js"],
  // "seeds": ["dist/**/database/seeds/**/*.js"],

              // autoLoadEntities: true,
              //此处定义为是否同步代码,,,,,,生产模式需关闭,  引入迁移模式
              // 千万慎重开启，
              synchronize: !false,  // 同步本地的schema与数据库   自动同步代码和数据库
              // timezone: "08:00", // 纠正时区偏差8小时
              timezone: "Z", //  
              logging: dev,  //日志记录类型  数据库操作记录
              // cache: true,   // 开启 查询缓存
            //   cache: {   //  可以将缓存记录到  内置的  redis里
            //     type: "redis",
            //     options: {
            //         host: "localhost",
            //         port: 6379
            //     }
            // }
              // dataStrings: ['DATE'], //??? 未知作用 强制日期类型    boolean | string[]-TIMESTAMP, DATETIME, DATE
              // replication: {   主从  复制
              //   master: {
              //     host: "server1",
              //     port: 3306,
              //     username: "test",
              //     password: "test",
              //     database: "test"
              //   },
              //   slaves: [{
              //     host: "server2",
              //     port: 3306,
              //     username: "test",
              //     password: "test",
              //     database: "test"
              //   }, {
              //     host: "server3",
              //     port: 3306,
              //     username: "test",
              //     password: "test",
              //     database: "test"
              //   }]
              // }
              
            } as TypeOrmModuleOptions ),
          }
          ),
          
    ]
})
export class OrmConfig {}


export default new DataSource ({   //  这里 给 typeorm  对 数据库 进行操作???
  // migrationsTableName: 'migrations',
  type: 'mysql',
  host: db1.host,
  port: db1.post,
  username: db1.user,
  password: db1.pwd,
  database: 'shengbai',
  entities: allEntities,
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,

} as DataSourceOptions
)