import { Column, Entity, PrimaryColumn, ViewEntity } from "typeorm";

@ViewEntity('logdata_money')
export class Moneylog {
    @PrimaryColumn()
    ID: number

    @Column()
    LogTime: Date;

    @Column()
    GroupID: string;

    @Column()
    AreaID: string;

    @Column()
    TargetID: string;

    @Column()
    SourceID: string;

    @Column()
    Action: string;

    @Column()
    Param: string;

    @Column()
    MoneyType: string;

    @Column()
    Reason: string;

    @Column()
    MoneyCount: string;

}
