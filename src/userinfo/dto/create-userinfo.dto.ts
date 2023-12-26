import { Departments } from "src/department/entities/department.entity";
import { Roles } from "src/role/entities/role.entity";
// import { IsString, IsNotEmpty } from 'class-validator'   //引入 类型校验
export class CreateUserinfoDto {
    // @IsString()
    username: string;
    // @IsNotEmpty()
    password: string;
    department?: Departments
    role?: Roles; 
}
