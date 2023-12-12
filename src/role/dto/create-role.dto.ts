import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/userinfo/entities/userinfo.entity";

export class CreateRoleDto {
    // @ApiProperty({ type: 'string' })
    // name: string
    status: number
    remark: string
    role: string
    menu: string
    usersArr: Users[];
}
