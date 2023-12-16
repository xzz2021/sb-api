import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/userinfo/entities/userinfo.entity";

export class CreateRoleDto {
    // @ApiProperty({ type: 'string' })
    // name: string
    id?: number  //  这是自增id 为了typescript类型对应  而加上
    status: number
    remark: string
    roleName: string
    menu: string
    usersArr: Users[];
}
