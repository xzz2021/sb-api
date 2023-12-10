import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 添加全局响应数据拦截器   定义统一返回数据的格式
import { ResponseInterceptor } from './allProcessor/interceptor/response';

//  使用winston替代nest自带日志系统
// import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
// import { RequestInterceptor } from './allProcessor/interceptor/request';
// import { ResponseInterceptor } from './allProcessor/interceptor/response';
// import { AllExceptionFilter } from './allProcessor/filter/all-exception';
// import { ValidationPipe } from '@nestjs/common';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 设置允许跨域
  app.enableCors();

  // app.setGlobalPrefix('全局接口前缀')
  // app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))  //  全局替换日志系统
  
     // 全局注册  正常响应拦截器  同一返回格式
     app.useGlobalInterceptors(new ResponseInterceptor())  //  对全局的接口 响应 进行日志记录

  await app.listen(3000);
}
bootstrap();
