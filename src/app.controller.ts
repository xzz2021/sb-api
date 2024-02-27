import { Body, Controller, Get, Inject, LoggerService, Post } from "@nestjs/common";
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { Public } from "./allProcessor/guard/public";
import { AppService } from "./app.service";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

@ApiTags("首页")
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,

    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Get("hello")
  @ApiOperation({ summary: "全平台服务入口", description: "此接口仅用于测试服务连通性" })
  @ApiForbiddenResponse({ description: "token认证失败!" })
  @ApiOkResponse({
    description:
      '响应成功!统一返回数据格式: {statusCode: "响应代码", timestamp: "响应时间", data: "响应对象数据"}',
  })
  @ApiNotFoundResponse({ description: "未找到匹配资源" })
  @Public()
  // @ApiCreatedResponse({
  //   description: '此接口仅用于测试服务连通性'
  //   })
  // @ApiResponse()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("yy")
  testCreate(@Body() database: any) {
    return this.appService.testCreate(database);
  }
}
