
//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Metas } from './meta.entity';


@Entity()
export class Menus {

    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    @Column({default: null})
    parentId: number;

    @Column({default: ''})
    path: string;

    @Column({default: ''})
    component: string;

    @Column({default: ''})
    redirect: string;

    @Column({ unique: true })
    // @Column({default: ''})
    name: string;

    @Column({default: ''})  //  权限名称  按钮名称
    label: string;

    @Column({default: ''})  //  权限名称  按钮名称
    title: string;

    @Column({default: ''})
    value: string;

    @Column({nullable: true}) // 用于顶级父菜单的排序
    sort: number;

    @Column({default: ''})  // 以json字符串数组形式存储  因为是唯一的
    permissionList: string;

    @Column({default: 3}) // 类型分三种 0目录/1组件/按钮  没传值时自动设定  它 默认是按钮 3
    type: number;

    @Column({default: 1})
    status: number; 

    // 每个次级菜单对应一个meta表里一行数据,  被关联表entity不需要定义
    @OneToOne(() => Metas, { cascade: true, eager: true})  
    @JoinColumn()   // 定义了JoinColumn  代表他是关联表的所有者  
    meta: Metas;

    // 关联角色  被关联
    //  @ManyToMany(() => Roles, role => role.menusArr, )  //如果设置 eager: true 查询时会自动加载关联表信息  不需要配置relations
    //  rolesArr: Relation<Roles[]>;  // ESM中   双向关系   定义relation 避免循环依赖

}
