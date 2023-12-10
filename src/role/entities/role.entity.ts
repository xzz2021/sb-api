
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/userinfo/entities/userinfo.entity';
import { Permissions } from 'src/permissions/entities/permission.entity';
import { Exclude } from 'class-transformer';
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    // @Exclude()
    roleId: number;

    @Column()
    @Generated("uuid")
    id: string;

    // @ApiProperty()
    // @Column()
    // role: string;   //  角色  admin/superadmin/guest 

    @ApiProperty()
    @Column()
    roleName: string; 

    @Column()
    remark: string; 

    @Column({default: 1})
    status: number; 


    @Column()  //  菜单暂时用json字符串
    menu: string; 

    // 单一角色 可以对应多个用户
    @OneToMany(() => Users, user => user.username)
    userArry: Users[];

    // 此处还需要关联一个路由权限表
    @ApiProperty()
    @ManyToMany(() => Permissions, permissions => permissions.routeLink, { cascade: true})   // 如果设置 eagger: true 查询时会自动加载关联表信息  不需要配置relations
    @JoinTable()  // 因为是多对多   这里是要关联整张表格
    permissions: Relation<Permissions[]>;// ESM中   双向关系   定义relation 避免循环依赖

    @CreateDateColumn()  //创建时自动插入日期时间
    createTime: string;

    @UpdateDateColumn()
    @Exclude()
    updateTime: string;

    @DeleteDateColumn()
    @Exclude()
    deleteTime: string;

}
