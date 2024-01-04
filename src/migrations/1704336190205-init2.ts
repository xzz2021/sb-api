import { MigrationInterface, QueryRunner } from "typeorm"

export class Init1704336190005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("roles", "menusArr2", "menusArr")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("roles", "menusArr", "menusArr2")

    }

}
