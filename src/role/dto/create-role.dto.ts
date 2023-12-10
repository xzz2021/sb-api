import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
    // @ApiProperty({ type: 'string' })
    // name: string
    status: number
    remark: string
    role: string
    menu: string
}
