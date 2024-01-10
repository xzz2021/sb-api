
import { changeDateFormate } from "src/allProcessor/fn/xzzfn";
import { AfterLoad, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() //  这里  必须  进行 装饰   否则 不会生成 对应 数据库表格
export class Logs {
    @AfterLoad()
    ff(){
        changeDateFormate(this)
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()  
    username: string;

    @Column()  
    nickname: string;

    // @Column({nullable: true})
    // module: string;

    @Column()
    ip: string;

    @Column({nullable: true})
    path: string;

    @CreateDateColumn()  //创建时自动插入日期时间
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

}
