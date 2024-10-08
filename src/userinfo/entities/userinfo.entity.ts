
//定义表格，表的名称会以class小写命名


//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Exclude } from 'class-transformer';
import { changeDateFormate } from 'src/allProcessor/fn/xzzfn';
import { Departments } from 'src/department/entities/department.entity';
import { Roles } from 'src/role/entities/role.entity';
import { AfterLoad, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn } from 'typeorm';

//   如果想在单个数据源中使用多个数据库,直接指定数据库的命名
//   @Entity({database: 'secondDatabaseName'})
@Entity()
export class Users {
    @AfterLoad()
    ff(){
        changeDateFormate(this)
    }
    
    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    @Column( { unique: true })  // 设定当前键为唯一值
    username: string;

    @Column( { default: '游客' })  // 设定当前键为唯一值
    nickname: string;

    @Column( { default: '' })  // 设定当前键为唯一值
    avator: string;
    
    @Column() // {select: false} 定义在进行查询时是否默认隐藏此列   //  不能隐藏  要校对 密码
    @Exclude()  // 转换数据, 排除此字段  //  结合@UseInterceptors(ClassSerializerInterceptor) 使用
    password: string;

    @CreateDateColumn()  //创建时自动插入日期时间
    @Exclude()
    createTime: string;

    // @BeforeInsert()   //   实体监听器   用于 数据库操作时 调用的函数  类似生命周期 钩子
    // updateDates() {
    //     this.createdDate = new Date()
    // }
    @UpdateDateColumn()
    updateTime: string;

    @DeleteDateColumn()
    @Exclude()
    deleteTime: string;

    //   一个用户  对应一个角色
   @ManyToOne(() => Roles, role => role.usersArr, { cascade: ['insert', 'update']})   //关联表单  ???  { eager: true}
   role: Relation<Roles>; 

   //  casade: ("insert" | "update" | "remove" | "soft-remove" | "recover")[]

    //  一个用户 对应 一个  部门
   @ManyToOne(() => Departments, department => department.departmentUsersArr, { cascade: ['insert', 'update']})  
   department: Departments;

}