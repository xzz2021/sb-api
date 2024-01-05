import 'reflect-metadata'
import { DataSource } from 'typeorm';
import { Users } from 'src/userinfo/entities/userinfo.entity'
import { Roles } from 'src/role/entities/role.entity';
import { Departments } from 'src/department/entities/department.entity';
import { Menus } from 'src/menu/entities/menu.entity';
import { Metas } from 'src/menu/entities/meta.entity';
import { Enumitem } from 'src/enumitem/entities/enumitem.entity';
import { Itemreview } from 'src/itemreview/entities/itemreview.entity';
import { MetaPermission } from 'src/role/entities/permission.entity';


let allEntities = [ Users, Roles, Menus, Departments, Metas, Enumitem, Itemreview, MetaPermission ]
export default new DataSource ({
  type: 'mysql',
  host: 'xzz2022.top',
  port: 3306,
  username: 'shengbai1',
  password: 'xzz...',
  database: 'shengbai',
//   entities: ['./dist/src/**/entities/*.js'],
  entities: allEntities,
  // autoLoadEntities: true,
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
})