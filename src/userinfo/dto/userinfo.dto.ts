import { Departments } from "src/department/entities/department.entity";
import { Roles } from "src/role/entities/role.entity";

export class AvatorDto {
    username: string;
    avator: string;
}


export class UpdateDto {
    username: string;
    password?: string;
    nickname: string;
}

export class UpdateUserDto {
    username: string;
    nickname: string;
    password?: string;
    role: {
      id: number
      roleName: string
    };
    department: {
      departmentName: string
      id: number
    }
  }



  export class RegisterResDto {
    id: number;
    username: string;
    password: string;
    nickname: string;
    createtime: string;
}

export class DeleteIds{ids: number[]}


export class LoginDto {
  username: string;
  password: string;
}

export class RegisterDto {
  username: string;
  password: string;
  nickname: string;
}


export class NewUser {
  username: string;
  password: string;
  nickname?: string;
  department?: Departments
  role?: Roles; 
}