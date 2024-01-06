import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { JoinQueryParamsDto } from './dto/department';

@ApiTags('部门相关信息')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}


  @Get('getDepartmentTable')
    @ApiOperation({summary: '获取所有部门信息', description: '返回嵌套树结构,用于部门管理'})
  getDepartmentTable(){
    return this.departmentService.getDepartmentTable(); 
  }

  @Post('add')
  @ApiOperation({summary: '添加部门', description: '用于添加新的部门'})
  add(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.add(createDepartmentDto);
  }

  //  删除部门
  @Delete(':id')
  @ApiOperation({summary: '删除部门', description: '用于删除已有部门'})
  removeDepartment(@Param('id') id: number) {
    return this.departmentService.removeDepartment( id )
  }

  //  批量删除部门
  @Post('batchDelete')
  @ApiOperation({summary: '批量删除部门', description: '用于批量删除已有部门'})
  batchRemoveDepartment(@Body() list:  any[]) {
    return this.departmentService.batchRemoveDepartment( list )
  }


  @Get('users')
  @ApiOperation({summary: '条件查询部门', description: '用于条件筛选查询部门信息'})
  findByDepartment(@Query() joinQueryParams: JoinQueryParamsDto) {
    // 根据部门id参数 查询关联用户  ?id=6&pageIndex=1&pageSize=10  
    return this.departmentService.findByDepartment(joinQueryParams)
  }

}
