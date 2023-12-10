
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/role/entities/role.entity';
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Permissions {

    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    @ApiProperty()
    @Column()
    routeLink: string;


     //  被关联表  users -> >>  roles
     @ManyToMany(() => Roles, role => role.roleName, { cascade: true})  //如果设置 eagger: true 查询时会自动加载关联表信息  不需要配置relations
    //  @JoinTable()  // 因为是多对多   这里是要关联整张表格
     // @JoinTable({name: 'user_role'})  // 因为是多对多   这里是要关联整张表格
     role: Relation<Roles[]>;  // ESM中   双向关系   定义relation 避免循环依赖
}
