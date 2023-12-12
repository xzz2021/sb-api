
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

    @Column({default: 'false'})
    activeMenu: string;

    @Column({default: 'false'})
    affix: string;

    @Column({default: 'false'})
    alwaysShow: string;

    @Column({default: 'false'})
    breadcrumb: string;

    @Column({default: 'false'})
    canTo: string;

    @Column({default: 'false'})
    hidden: string;

    @Column({default: 'false'})
    noCache: string;

    @Column({default: 'false'})
    noTagsView: string;

    @Column({default: ''})
    icon: string;

    @Column()
    title: string;

    

}
