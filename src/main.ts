import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 添加全局响应数据拦截器   定义统一返回数据的格式
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//  使用winston替代nest自带日志系统
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './allProcessor/filter/all-exception';
import { ResponseInterceptor } from './allProcessor/interceptor/response';
import { simpleFunction } from './allProcessor/middleware/simple-function';
import { TransformInterceptor } from './allProcessor/interceptor/transform';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置允许跨域
  app.enableCors();

  // app.setGlobalPrefix('全局接口前缀')
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))  //  全局替换日志系统
  
  // app.useGlobalInterceptors(new TransformInterceptor())  // 全局 数据 转换  拦截器
      // 全局filter只能有一个
      const httpAdapter  = app.get(HttpAdapterHost)
      app.useGlobalFilters(new AllExceptionFilter(httpAdapter))  // 对全局请求异常错误的过滤器，排除网关根目录请求
      
     // 全局注册  正常响应拦截器  同一返回格式
    //  app.useGlobalInterceptors(new RequestInterceptor())  //  对全局的接口 响应 进行日志记录
     app.useGlobalInterceptors(new ResponseInterceptor())  //  对全局的接口 响应 进行日志记录


       //  全局数据格式校验管道
  // app.useGlobalPipes(new ValidationPipe(
  //   // whitelist 功能    保留dto里定义过的数据字段, 去除前端传递过来的其他字段, 防范恶意代码
  //   // {whitelist: true }
  // ));
  app.use(simpleFunction)   //  路由  函数中间件
//   app.use(requestIp.mw())
//   app.use(function(req, res) {
//     const ip = req.clientIp;
//     res.end(ip);
// });
  // app.use(simpleFunction )  // 引入 全局中间件

    // 引入自动生成接口文档的swagger
    const config = new DocumentBuilder()
    .addBearerAuth() //  接口文档添加 token验证    配合@ApiBearerAuth() 使用
    .setTitle('接口文档')
    .setDescription('盛柏后台管理系统接口')
    .setVersion('1.0.11')
    .addServer('http://localhost:3000', '本地开发环境')
    .addServer('http://localhost:30001', '线上环境')
    // .addTag('design by xzz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000)
}
bootstrap();
