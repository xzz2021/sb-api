import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { EnumitemService } from './enumitem.service';
import { CreateEnumitemDto } from './dto/create-enumitem.dto';
import { UpdateEnumitemDto } from './dto/update-enumitem.dto';
import { JwtAuthGuard } from 'src/allProcessor/guard/auth.guard';

@Controller('enumitem')
export class EnumitemController {
  constructor(private readonly enumitemService: EnumitemService) {}

  @Post()
  create(@Body() createEnumitemDto: CreateEnumitemDto) {
    return this.enumitemService.create(createEnumitemDto);
  }

  @Get('search')
  // @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  findByDepartment(@Query() joinQueryParams: any, ) {
    // 根据部门id参数 查询关联用户  ?id=6&pageIndex=1&pageSize=10 
    return this.enumitemService.joinQuery(joinQueryParams)
  }


   //  添加  或者  修改 已有 枚举 项目
   @Post('update')
   updateEnumitem(@Body() createEnumitemDto: CreateEnumitemDto) {
     return this.enumitemService.updateEnumitem(createEnumitemDto);
   }

}
