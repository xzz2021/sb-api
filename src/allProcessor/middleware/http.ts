//  中间件 定义  处理请求响应 的中间处理函数 
//  中间件 需要在入口module模块的导出里 implements 使用

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
// import { requestIp } from 'request-ip';
@Injectable()
export class HttpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log('🚀 ~ file: http.ts:10 ~ HttpMiddleware ~ use ~ res:', res)
    // console.log('🚀 ~ file: http.ts:10 ~ HttpMiddleware ~ use ~ req:', req)
    // console.log('Request...');
    // const clientIp = requestIp.getClientIp(req); 
    next();
  }
}
