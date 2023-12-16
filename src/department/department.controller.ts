import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  // 获取所有角色信息
  @Get('getDepartmentTable')
  getDepartmentTable(){
    // return this.departmentService.findAllDepartments();
    let list = [{
      departmentName: '泉州总公司',
      remark: '泉州9999',
      status: 1,
      id: '908798676786',
      createTime: '2020-01-01 00:00:00',
      children: [
        {
          departmentName: '开发部',
          remark: '开发89798798789',
          status: 1,
          id: '908798676786',
          createTime: '2020-01-01 00:00:00',
          // children: []
          // children: [
          //   {
          //     departmentName: '组长',
          //     remark: '组长89798798789',
          //     status: 1,
          //     id: '908798676786',
          //     createTime: '2020-01-01 00:00:00',
          //     // children: []
          //   }
          // ]
        }
      ]
    }]
    // return { list, total: list.length  }
    return this.departmentService.getList(); 
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

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  // @Get('joinquery')  // 联合查询
  // joinQuery(@Query() joinQueryParams: joinQueryInfo) {
  //   this.userinfoService.joinQuery(joinQueryParams)
  // }

  @Get('users')
  findByDepartment(@Query() joinQueryParams: any) {
    console.log('🚀 ~ file: department.controller.ts:74 ~ DepartmentController ~ findByDepartment ~ joinQueryParams:', joinQueryParams)
    // 根据部门id参数 查询关联用户  ?id=6&pageIndex=1&pageSize=10  
    return this.departmentService.findAll();
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

}
