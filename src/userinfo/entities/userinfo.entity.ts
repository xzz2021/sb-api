
//定义表格，表的名称会以class小写命名


//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn, VersionColumn } from 'typeorm'
import { Exclude } from 'class-transformer';
import { Roles } from 'src/role/entities/role.entity';
import { Departments } from 'src/department/entities/department.entity';

//   如果想在单个数据源中使用多个数据库,直接指定数据库的命名
//   @Entity({database: 'secondDatabaseName'})
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    @Column( { unique: true })  // 设定当前键为唯一值
    username: string;

    @Column( { default: '游客' })  // 设定当前键为唯一值
    nickname: string;

    @Column()
    @Exclude()  // 转换数据, 排除此字段  //  结合@UseInterceptors(ClassSerializerInterceptor) 使用
    password: string;

    @CreateDateColumn()  //创建时自动插入日期时间
    @Exclude()
    createtime: string;

    @UpdateDateColumn()
    @Exclude()
    updatetime: string;

    @DeleteDateColumn()
    @Exclude()
    deletetime: string;

    //   一个用户  对应一个角色
   @ManyToOne(() => Roles, role => role.usersArr, { cascade: true})   //关联表单  ???  { eager: true}
   role: Roles; 

    //  一个用户 对应 一个  部门
   @ManyToOne(() => Departments, department => department.departmentUsersArr, { cascade: true})  
   department: Departments;

}