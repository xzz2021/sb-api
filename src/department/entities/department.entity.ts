
//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { ApiProperty } from '@nestjs/swagger';
import { changeDateFormate } from 'src/allProcessor/fn/xzzfn';
import { Users } from 'src/userinfo/entities/userinfo.entity';
import { AfterLoad, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';


@Entity()
export class Departments {
    @AfterLoad()
    ff(){
        changeDateFormate(this)
    }
    
    @PrimaryGeneratedColumn()
    id: number;

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
    updateTime: string;

    @DeleteDateColumn()
    deleteTime: string;

    //  一个部门  对应 多个  用户
    @OneToMany(() => Users, user => user.department)   //关联表单 
    departmentUsersArr: Relation<Users[]>; 

}
