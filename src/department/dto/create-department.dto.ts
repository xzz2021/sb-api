export class CreateDepartmentDto {

    departmentName: string; 
    remark?: string; 
    status: number;
    parentId: number
    usersArr?: any[]
}
