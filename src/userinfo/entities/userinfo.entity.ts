
//定义表格，表的名称会以class小写命名


//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation, UpdateDateColumn, VersionColumn } from 'typeorm'
import { Exclude } from 'class-transformer';
import { Roles } from 'src/role/entities/role.entity';

//   如果想在单个数据源中使用多个数据库,直接指定数据库的命名
//   @Entity({database: 'secondDatabaseName'})
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number;

    @Column( { unique: true })  // 设定当前键为唯一值
    username: string;

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

    //  多对多关联用户 一个用户可能有多个角色
   @ManyToMany(() => Roles, role => role.usersArr,)   //关联表单
   @JoinTable()  // 因为是多对多   这里是要关联整张表格
   rolesArr: Roles[]; 

}