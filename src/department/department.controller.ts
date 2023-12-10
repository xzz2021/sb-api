import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
          children: []
        }
      ]
    }]
    return { list, total: list.length  }
  }

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id);
  }
}
