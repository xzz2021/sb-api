//  有时候业务处理很简单 不需要复杂需求   可以使用函数  中间件

import { NextFunction, Request, Response } from 'express';

export function simpleFunction(req: Request, res: Response, next: NextFunction) {
  // console.log('🚀 ~ file: simple-function.ts:6 ~ simpleFunction ~ res:', res)
  // // 不管路由请求成功 或 失败 都会走这里
  // console.log('🚀 ~ file: simple-function.ts:7 ~ simpleFunction ~ req:', req)


  next();
};


//  使用也很简单  在app.module里使用

// consumer
//   .apply(logger)
//   .forRoutes(CatsController);