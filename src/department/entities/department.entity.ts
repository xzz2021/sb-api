
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Departments {
    @PrimaryGeneratedColumn()
    // @Exclude()
    departmentId: number;

    @Column()
    @Generated("uuid")
    id: string;

    @ApiProperty()
    @Column()
    departmentName: string;   //  角色  admin/superadmin/guest 

    @Column()
    remark: string;

    @Column('boolean', {default: true})
    // @Column()
    status: boolean; 

    @CreateDateColumn()  //创建时自动插入日期时间
    createTime: string;

    @UpdateDateColumn()
    @Exclude()
    updateTime: string;

    @DeleteDateColumn()
    @Exclude()
    deleteTime: string;

}
