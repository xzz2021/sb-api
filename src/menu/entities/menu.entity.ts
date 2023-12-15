
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/role/entities/role.entity';
import { Metas } from './meta.entity';
import { PermissionLists } from 'src/permission-list/entities/permission-list.entity';
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Menus {

    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    // @Column()
    // @Generated("uuid")  // 因为uuid有-符号  所以必须设定成字符串
    // id: string;

    @Column({default: null})
    parentId: number;

    @Column()
    path: string;

    @Column({default: ''})
    component: string;

    @Column({default: ''})
    redirect: string;

    @Column({ unique: true })
    // @Column({default: ''})
    name: string;

    // @Column()
    // type: string;

    @Column({default: 1})
    status: number; 

    // 每个次级菜单对应一个meta表里一行数据,  被关联表entity不需要定义
    @OneToOne(() => Metas, { cascade: true, eager: true})  
    @JoinColumn()   // 定义了JoinColumn  代表他是关联表的所有者  
    meta: Metas;

    // admin  --->  n+n张菜单    菜单二  联接   add  del  view
    // normal ---> n张菜单  其中菜单二   联接  add

    // 关联角色  被关联
     @ManyToMany(() => Roles, role => role.menusArr, )  //如果设置 eager: true 查询时会自动加载关联表信息  不需要配置relations
     rolesArr: Relation<Roles[]>;  // ESM中   双向关系   定义relation 避免循环依赖

     // 菜单关联按钮权限
     @OneToMany(() => PermissionLists, permissionList => permissionList.menu, { cascade: true })  //如果设置 eager: true 查询时会自动加载关联表信息  不需要配置relations
     @JoinTable()
     permissionList: Relation<PermissionLists[]>;  // ESM中   双向关系   定义relation 避免循环依赖
}
