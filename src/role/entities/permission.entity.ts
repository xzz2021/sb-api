
//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import {  Column,  Entity,  ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Roles } from './role.entity';


@Entity()
export class MetaPermission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    menuId: number; 

    @Column({default: null, type: 'longtext'})  //  将分配的用户权限以json形式存储
    permission: string; 

        //   多个permission  对应一个角色
   @ManyToOne(() => Roles, role => role.metaPermission)   //关联表单  ???  { eager: true}
   role: Relation<Roles>; 

}
