
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Metas {

    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    @Column({default: ''})
    activeMenu: string;

    @Column({default: false})
    affix: boolean;

    @Column({default: false})
    alwaysShow: boolean;

    @Column({default: false})
    breadcrumb: boolean;

    @Column({default: false})
    canTo: boolean;

    @Column({default: false})
    hidden: boolean;

    @Column({default: false})
    noCache: boolean;

    @Column({default: false})
    noTagsView: boolean;

    @Column({default: ''})
    icon: string;

    @Column()
    title: string;

}
