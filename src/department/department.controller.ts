import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JwtAuthGuard } from 'src/allProcessor/guard/auth.guard';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  // 获取所有角色信息
  @Get('getDepartmentTable')
  getDepartmentTable(){

    // return { list, total: list.length  }
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

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  // @Get('joinquery')  // 联合查询
  // joinQuery(@Query() joinQueryParams: joinQueryInfo) {
  //   this.userinfoService.joinQuery(joinQueryParams)
  // }

  @Get('users')
  @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  findByDepartment(@Query() joinQueryParams: any, @Req() req: any) {
    const {  role } = req.user;
    // 根据部门id参数 查询关联用户  ?id=6&pageIndex=1&pageSize=10  
    return this.departmentService.findByDepartment(joinQueryParams, role)
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get('tempadd')
  tempadd(){
    return this.departmentService.tempadd()
  }

}
