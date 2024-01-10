  
  //  数据转换   拦截器
  import { Injectable, NestInterceptor,  ExecutionContext, CallHandler,  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import {  map } from 'rxjs/operators';
  
  @Injectable()
  export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      // const req = context.getArgByIndex(1).req
      // console.log('🚀 ~ file: transform.ts:16 ~ TransformInterceptor ~ intercept ~ req.user:', req.user)
      return next
        .handle()
        .pipe(
          map(data=>{
            return data
          })
        )
    }
  }
  