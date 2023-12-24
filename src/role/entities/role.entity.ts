
//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm'
import { Users } from 'src/userinfo/entities/userinfo.entity';
import { Exclude } from 'class-transformer';


@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    roleName: string; 

    @Column({default: ''})
    remark: string; 

    @Column({default: 1})
    status: number; 

    @Column({default: null, type: 'longtext'})  //  将分配的用户菜单及权限以json形式存储
    menusArr: string; 

    // 每个用户对应一个角色
    //  一个角色 可以对应多个用户
    @OneToMany(() => Users, user => user.role)  
    @JoinColumn()   // 定义了JoinColumn  代表他是关联表的所有者  
    usersArr: Relation<Users>[];

    @CreateDateColumn()  //创建时自动插入日期时间
    createTime: string;

    @UpdateDateColumn()
    @Exclude()
    updateTime: string;

    @DeleteDateColumn()
    @Exclude()
    deleteTime: string;

}
