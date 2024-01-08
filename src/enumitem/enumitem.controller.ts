import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EnumitemService } from './enumitem.service';

@ApiTags('日志枚举')
@Controller('enumitem')
export class EnumitemController {
  constructor(private readonly enumitemService: EnumitemService) {}

  @Post('search')
  @ApiOperation({summary: '查询枚举', description: '根据条件批量查询对应枚举项目'})
  findByDepartment(@Body() joinQueryParams: string[], ) {
    // 根据部门id参数 查询关联用户  ?id=6&pageIndex=1&pageSize=10 
    return this.enumitemService.joinQuery(joinQueryParams)
  }

   //  添加  或者  修改 已有 枚举 项目
   @Post('update')
  @ApiOperation({summary: '批量更新枚举', description: '前端通过解析excel,后端批量更新所有枚举项目'})
  updateEnumitem(@Body() updateEnumite: updateEnumitem[]) {
     return this.enumitemService.updateEnumitem(updateEnumite);
   }
}
