
//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm'
import { Users } from 'src/userinfo/entities/userinfo.entity';
import { Exclude } from 'class-transformer';
import { Menus } from 'src/menu/entities/menu.entity';
import { MetaPermission } from './permission.entity';


@Entity()
export class Roles {
    // @AfterLoad()
    // changeDateFormate(){
    //     const rTime = (date) =>{  // 转换日期 时间 格式
    //         // var json_date = new Date(date).toJSON();
    //         return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
    //     }
    //     this.createTime = rTime(this.createTime)
    //     this.updateTime = rTime(this.updateTime)
    // }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    roleName: string; 

    @Column({default: ''})
    remark: string; 

    @Column({default: 1})
    status: number; 

    // @Column({default: null, type: 'longtext'})  //  将分配的用户菜单及权限以json形式存储
    // menusArr: string; 

    // 每个用户对应一个角色
    //  一个角色 可以对应多个用户
    @OneToMany(() => Users, user => user.role)  
    @JoinColumn()   // 定义了JoinColumn  代表他是关联表的所有者  
    usersArr: Relation<Users>[];

    //  一个角色 可以对应多个permission
    @OneToMany(() => MetaPermission, permissions => permissions.role, { cascade: true })  
    @JoinColumn()   // 定义了JoinColumn  代表他是关联表的所有者  
    metaPermission: Relation<MetaPermission>[];

    // 一个角色 对应多个菜单   单向 多对多关系
    @ManyToMany(() => Menus, { cascade: true })  
    @JoinTable()   // 定义了JoinTable  代表他是关联表的所有者  
    menusArr2: Menus[];

    @CreateDateColumn()  //创建时自动插入日期时间
    createTime: string;

    @UpdateDateColumn()
    @Exclude()
    updateTime: string;

    @DeleteDateColumn()
    @Exclude()
    deleteTime: string;

}
