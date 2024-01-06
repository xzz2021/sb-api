import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('部门相关信息')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  // 获取所有角色信息
  @Get('getDepartmentTable')
  getDepartmentTable(){
    return this.departmentService.getDepartmentTable(); 
  }

  @Post('add')
  add(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.add(createDepartmentDto);
  }

  //  删除部门
  @Delete(':id')
  removeDepartment(@Param('id') id: number) {
    return this.departmentService.removeDepartment( id )
  }

  //  批量删除部门
  @Post('batchDelete')
  batchRemoveDepartment(@Body() list:  any[]) {
    return this.departmentService.batchRemoveDepartment( list )
  }

  // @Post()
  // create(@Body() createDepartmentDto: CreateDepartmentDto) {
  //   return this.departmentService.create(createDepartmentDto);
  // }

  // @Get('joinquery')  // 联合查询
  // joinQuery(@Query() joinQueryParams: joinQueryInfo) {
  //   this.userinfoService.joinQuery(joinQueryParams)
  // }

  @Get('users')
  findByDepartment(@Query() joinQueryParams: any, @Req() req: any) {
    const {  roleName } = req.user;
    // 根据部门id参数 查询关联用户  ?id=6&pageIndex=1&pageSize=10  
    return this.departmentService.findByDepartment(joinQueryParams, roleName)
  }

}
