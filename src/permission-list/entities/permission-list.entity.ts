
import { Menus } from 'src/menu/entities/menu.entity';
import { Roles } from 'src/role/entities/role.entity';
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

@Entity()
export class PermissionLists {

    @PrimaryGeneratedColumn()
    // @Exclude()
    permissionId: number;

    @Column()
    @Generated("uuid")  // 因为uuid有-符号  所以必须设定成字符串
    id: string;

    @Column()
    label: string;

    @Column()
    value: string;

    // 每个次级菜单对应一个meta表里一行数据,  被关联表entity不需要定义
    @ManyToOne(() => Roles, role => role.permissions)  
    @JoinColumn()   // 定义了JoinColumn  代表他是关联表的所有者  
    permissionRole: Roles;

     @ManyToMany(() => Menus)
     @JoinTable()
     menus: Relation<Menus[]>;  // ESM中   双向关系   定义relation 避免循环依赖
}
