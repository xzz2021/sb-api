

//  需要把配置信息改造成单独的ts文件进行引用,  见底部模板

import { Module } from '@nestjs/common';

import {  ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Users } from '../userinfo/entities/userinfo.entity'
// import { Profile } from '../profiles/profile.entity';
// import { Roles } from '../roles/roles.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Roles } from 'src/role/entities/role.entity';
import { Permissions } from 'src/permissions/entities/permission.entity';


let allEntities = [ Users, Roles, Permissions ]
// let allEntities = [Users, Profile, Roles ]

// 引入.env文件的变量合并到node环境中
require('dotenv').config();



@Module({

    imports: [

        TypeOrmModule.forRootAsync({  
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>({
              type: 'mysql',
              host: configService.get('DBHOST'),
              port: 3306,
              username: configService.get('DBUSER'),
              password: configService.get('DBPWD'),
              database: 'shengbai',
              entities: allEntities,
              // [  // 定义生成表格
              //   Users,
              //   Profile,
              //   Logs,
              // ],
              //此处定义为是否同步代码,,,,,,生产模式需关闭,  引入迁移模式
              synchronize: !false,  // 同步本地的schema与数据库   自动同步代码和数据库
              // timezone: "08:00", // 纠正时区偏差8小时
              timezone: "Z", //  
              logging: ['error'],  //日志记录类型  数据库操作记录
              // dataStrings: ['DATE'], //??? 未知作用 强制日期类型    boolean | string[]-TIMESTAMP, DATETIME, DATE
              
            } as TypeOrmModuleOptions ),
          }),
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
  // migrations: ['src/migrations/*{.ts,.js}'],
  synchronize: false,
  timezone: "Z", //  
  logging: ['error'], 

} as DataSourceOptions
)

