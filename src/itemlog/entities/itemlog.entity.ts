
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('logdata_item')
export class Itemlog {
    @PrimaryColumn()
    ID: number

    @Column()
    LogTime: Date;

    @Column()
    GroupID: string;

    @Column()
    AreaID: string;

    @Column()
    RoleID: string;

    @Column()
    ActionType: string;

    @Column()
    Guid: string;

    @Column()
    TemplateID: string;

    @Column()
    ItemCount: string;

    @Column()
    Reason: string;

    @Column()
    UserDefinedID: string;

}
