
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Users } from 'src/userinfo/entities/userinfo.entity';
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Departments {
    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    // @Column()
    // @Generated("uuid")  // 因为uuid有-符号  所以必须设定成字符串
    // id: string;

    @ApiProperty()
    @Column()
    departmentName: string;   //  角色  admin/superadmin/guest

    @Column({default: null})
    parentId: number;

    @Column({default: ''})
    remark: string;

    @Column( {default: 1})
    status: number; 

    @CreateDateColumn()  //创建时自动插入日期时间
    createTime: string;

    @UpdateDateColumn()
    @Exclude()
    updateTime: string;

    @DeleteDateColumn()
    @Exclude()
    deleteTime: string;

    //  一个部门  对应 多个  用户
    @OneToMany(() => Users, user => user.department,)   //关联表单 
    departmentUsersArr: Users[]; 

}
