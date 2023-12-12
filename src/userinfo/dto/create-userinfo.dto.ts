import { Roles } from "src/role/entities/role.entity";

export class CreateUserinfoDto {
    username: string;
    password: string;
    userInfo_role?: string
    rolesArr: Roles[]; 
}
