

//  需要把配置信息改造成单独的ts文件进行引用,  见底部模板

import { Module } from '@nestjs/common';
import {  ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '../userinfo/entities/userinfo.entity'
import { DataSource, DataSourceOptions } from 'typeorm';
import { Roles } from 'src/role/entities/role.entity';
import { Departments } from 'src/department/entities/department.entity';
import { Menus } from 'src/menu/entities/menu.entity';
import { Metas } from 'src/menu/entities/meta.entity';
import { Itemlog } from 'src/itemlog/entities/itemlog.entity';
import { Moneylog } from 'src/moneylog/entities/moneylog.entity';
import { Enumitem } from 'src/enumitem/entities/enumitem.entity';
import { Onlineplayer } from 'src/onlineplayer/entities/onlineplayer.entity';


let allEntities = [ Users, Roles, Menus, Departments, Metas, Enumitem ]

// 引入.env文件的变量合并到node环境中
// require('dotenv').config();

@Module({

    imports: [

        TypeOrmModule.forRootAsync({  
            imports: [ConfigModule],
            inject: [ConfigService],
            name: 'default',
            useFactory: (configService: ConfigService) =>({
              name: 'default',
              type: 'mysql',
              host: configService.get('DBHOST'),
              port: 3306,
              username: configService.get('DBUSER'),
              password: configService.get('DBPWD'),
              database: 'shengbai',
              entities: allEntities,
              // migrations: [/*...*/],    // 迁移选项 列表
              // [  // 定义生成表格
              //   Users,
              //   Profile,
              //   Logs,
              // ],
              //此处定义为是否同步代码,,,,,,生产模式需关闭,  引入迁移模式
              // 千万慎重开启，
              synchronize: !false,  // 同步本地的schema与数据库   自动同步代码和数据库
              // timezone: "08:00", // 纠正时区偏差8小时
              timezone: "Z", //  
              logging: ['error'],  //日志记录类型  数据库操作记录
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
          TypeOrmModule.forRootAsync({  
            imports: [ConfigModule],
            inject: [ConfigService],
            name: 'gamelog',
            useFactory: (configService: ConfigService) =>({
              name: 'gamelog',
              type: 'mysql',
              host: configService.get('DBHOST2'),
              port: 3306,
              username: configService.get('DBUSER2'),
              password: configService.get('DBPWD2'),
              database: 'pc_202309171442_log',
              entities: [Itemlog, Moneylog, Onlineplayer],
              //此处定义为是否同步代码,,,,,,生产模式需关闭,  引入迁移模式
              // 千万慎重开启，
              synchronize: false,  
              timezone: "Z", //  
              // logging: ['error'], 
              retryAttempts: 5  //  重试连接数据库的次数（默认：10）
              
            } as TypeOrmModuleOptions ),
          }
          ),
          // TypeOrmModule.forRootAsync({  
          //   imports: [ConfigModule],
          //   inject: [ConfigService],
          //   name: 'gamelog2',
          //   useFactory: (configService: ConfigService) =>({
          //     name: 'gamelog2',
          //     type: 'mysql',
          //     host: configService.get('DBHOST2'),
          //     port: 3306,
          //     username: configService.get('DBUSER2'),
          //     password: configService.get('DBPWD2'),
          //     database: 'pc_202309171442_log',
          //     entities: [Onlineplayer],
          //     //此处定义为是否同步代码,,,,,,生产模式需关闭,  引入迁移模式
          //     // 千万慎重开启，
          //     synchronize: !false,  
          //     timezone: "Z", //  
          //     // logging: ['error'], 
              
          //   } as TypeOrmModuleOptions ),
          // }
          // )
          // TypeOrmModule.forFeature([Itemlog], 'gamelog')
    ]
})
export class OrmConfig {}


export default new DataSource ({
  // migrationsTableName: 'migrations',
  type: 'mysql',
  host: process.env.DBHOST,
  port: 3306,
  username: process.env.DBUSER,
  password: process.env.DBPWD,
  database: 'shengbai',
  entities: allEntities,
  migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
  // timezone: "Z", //  
  // logging: ['error'], 

} as DataSourceOptions

)

//  const DataSource2 = new DataSource({
//   // migrationsTableName: 'migrations',
//   type: 'mysql',
//   host: process.env.DBHOST2,
//   port: 3306,
//   username: process.env.DBUSER2,
//   password: process.env.DBPWD2,
//   database: 'pc_202309171442_log',
//   entities: [Itemlog],
//   // migrations: ['src/migrations/*{.ts,.js}'],
//   synchronize: false,
//   timezone: "Z", //  
//   // logging: ['error'], 

// } as DataSourceOptions
// )

// export  {DataSource2}