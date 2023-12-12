
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/role/entities/role.entity';
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Metas {

    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    @Column()
    activeMenu: boolean;

    @Column()
    affix: boolean;

    @Column()
    alwaysShow: boolean;

    @Column()
    breadcrumb: boolean;

    @Column()
    canTo: boolean;

    @Column()
    hidden: boolean;

    @Column()
    noTagsView: boolean;

    @Column()
    icon: string;

    @Column()
    title: string;

    @Column()
    noCache: string;

}
