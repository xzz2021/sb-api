import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnumitemService } from './enumitem.service';

@ApiTags('游戏枚举项目')
@Controller('enumitem')
export class EnumitemController {
  constructor(private readonly enumitemService: EnumitemService) {}

  @Post('search')
  findByDepartment(@Body() joinQueryParams: string[], ) {
    // 根据部门id参数 查询关联用户  ?id=6&pageIndex=1&pageSize=10 
    return this.enumitemService.joinQuery(joinQueryParams)
  }

   //  添加  或者  修改 已有 枚举 项目
   @Post('update')
   updateEnumitem(@Body() updateEnumite: updateEnumitem[]) {
     return this.enumitemService.updateEnumitem(updateEnumite);
   }
}
