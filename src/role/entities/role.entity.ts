
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/userinfo/entities/userinfo.entity';
import { Menus } from 'src/menu/entities/menu.entity';

import { Exclude } from 'class-transformer';
import { PermissionLists } from 'src/permission-list/entities/permission-list.entity';
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    id: string;

    // @Column()
    // role: string;   //  角色  admin/superadmin/guest 

    // @ApiProperty()
    @Column({ unique: true })
    roleName: string; 

    @Column({default: ''})
    remark: string; 

    @Column({default: 1})
    status: number; 

    // 单一角色 可以对应多个用户  用户-角色关联表
    @ManyToMany(() => Users, user => user.rolesArr)
    usersArr: Users[];

    // // 角色关联  菜单
    @ManyToMany(() => Menus, menu => menu.rolesArr, { cascade: true, eager: true })   // 如果设置 eager: true 查询时会自动加载关联表信息  不需要配置relations
    @JoinTable()  // 因为是多对多   这里是要关联整张表格
    menusArr: Relation<Menus[]>;// ESM中   双向关系   定义relation 避免循环依赖


    // 角色关联permissionList
    @OneToMany(() => PermissionLists, permissionList => permissionList.role, { cascade: true})  //如果设置 eager: true 查询时会自动加载关联表信息  不需要配置relations
     @JoinTable()
     permissionList: Relation<PermissionLists[]>;  // ESM中   双向关系   定义relation 避免循环依赖

    // @OneToMany(() => PermissionLists, permissionList => permissionList.permissionRole, { eager: true }) //  
    // @JoinColumn()   // 定义了JoinColumn  代表他是关联表的所有者  
    // permissions: PermissionLists[];

    @CreateDateColumn()  //创建时自动插入日期时间
    createTime: string;

    @UpdateDateColumn()
    @Exclude()
    updateTime: string;

    @DeleteDateColumn()
    @Exclude()
    deleteTime: string;

}
