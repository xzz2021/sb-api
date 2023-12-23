import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("logdata_onlierolecount", { schema: "pc_202309171442_log" })
export class Onlineplayer {
  @PrimaryGeneratedColumn({ type: "int", name: "Index", unsigned: true })
  Index: number;

  @Column("int", { name: "OnlieRoleCount", nullable: true, unsigned: true })
  OnlieRoleCount: number | null;

  @Column("int", { name: "SaveTime", nullable: true, unsigned: true })
  SaveTime: number | null;
}
