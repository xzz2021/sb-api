
import { AfterLoad, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity() //  这里  必须  进行 装饰   否则 不会生成 对应 数据库表格
export class Itemreview {
    @AfterLoad()
    changeDateFormate(){
        const rTime = (date) =>{  // 转换日期 时间 格式
            // var json_date = new Date(date).toJSON();
            return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        }
        this.createtime = rTime(this.createtime)
        this.updatetime = rTime(this.updatetime)
    }
    @PrimaryGeneratedColumn()
    id: number

    // @Column()  //  申请人 id
    // applyerId: number

    // @Column()  //  审批人 id
    // reviewerId: number

    @Column()  
    content: string;   //  提交审核  申请内容

    @Column({nullable: true})
    applyRemark: string;

    @Column({default: true})
    applyStatus: boolean;   //  申请状态

    @Column()
    applicant: string;  //  申请人

    @Column({nullable: true})
    reviewer: string;   //  审批人

    @Column({nullable: true})
    reviewRemark: string;    //  审批 意见  内容

    @Column({default: null})
    reviewStatus: boolean;   //  审批状态

    @CreateDateColumn()  //创建时自动插入日期时间
    createtime: Date | string;

    @UpdateDateColumn()
    updatetime: Date | string;

}
