import { Departments } from "src/department/entities/department.entity";
import { Roles } from "src/role/entities/role.entity";

export class CreateUserinfoDto {
    username: string;
    password: string;
    department?: Departments
    role?: Roles; 
}
