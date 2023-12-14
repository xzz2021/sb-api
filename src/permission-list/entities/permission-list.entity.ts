
import { Menus } from 'src/menu/entities/menu.entity';
import { Roles } from 'src/role/entities/role.entity';
import { Column, Entity, Generated, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'

@Entity()
export class PermissionLists {

    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    // @Column()
    // @Generated("uuid")  // 因为uuid有-符号  所以必须设定成字符串
    // id: string;

    // @Column({default: null})  //   此处parentId 其实就是关联的菜单id
    // parentId: number;

    @Column()  //  权限名称  按钮名称
    label: string;

    @Column()
    value: string;


    @ManyToOne(() => Roles, role => role.permissionList)  
    role: Roles;

     //   此处  其实就是关联了菜单
     @ManyToOne(() => Menus, menu => menu.permissionList )  
     menu: Menus;  // ESM中   双向关系   定义relation 避免循环依赖
}
