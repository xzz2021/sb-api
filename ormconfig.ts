import 'reflect-metadata';
//  0.4.0之后可能只支持json配置文件????  或是只支持datasource导出
import * as config from 'config';
import { Departments } from 'src/department/entities/department.entity';
import { Enumitem } from 'src/enumitem/entities/enumitem.entity';
import { Itemreview } from 'src/itemreview/entities/itemreview.entity';
import { Menus } from 'src/menu/entities/menu.entity';
import { Metas } from 'src/menu/entities/meta.entity';
import { MetaPermission } from 'src/role/entities/permission.entity';
import { Roles } from 'src/role/entities/role.entity';
import { Users } from 'src/userinfo/entities/userinfo.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Logs } from 'src/logger/entities/log.entity';

const db1 = config.get('db1')
export let allEntities = [ Users, Roles, Menus, Departments, Metas, Enumitem, Itemreview, MetaPermission, Logs]
//  公共配置, 导出给appmodule使用
export const typeormConfig: DataSourceOptions = 
  {
    type: 'mysql',
    host: db1.host,
    port: db1.post,
    username: db1.user,
    password: db1.pwd,
    entities: allEntities,
    // autoLoadEntities: true,
    database: db1.db,
    synchronize: false,
    timezone: "Z", 
    logging: false,
      // cache: true,   // 开启 查询缓存
            //   cache: {   //  可以将缓存记录到  内置的  redis里
            //     type: "redis",
            //     options: {
            //         host: "localhost",
            //         port: 6379
            //     }
            // }
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
  } as DataSourceOptions


  //  此DataSource用于 typeorm  进行迁移  读取
export default new DataSource ({...typeormConfig, migrations: ['src/migrations/*.ts']})
