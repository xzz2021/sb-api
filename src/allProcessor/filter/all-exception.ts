
//  全局的过滤器 只能有一个
//  此处定义请求时，所有抛出的意外错误  格式化处理 

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

import * as requestIp from 'request-ip';
import { LogService } from 'src/logger/menu.service';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {

  constructor(private readonly httpAdapterHost: HttpAdapterHost,
    // @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
    ) {}  // 此处用于拿到所有意外信息

  // catch(exception: HttpException, host: ArgumentsHost) {
    catch(exception: any, host: ArgumentsHost) {
      // const { errno, sqlState, sqlMessage } = exception
      // super.catch(exception, host)
    // 使用httpAdapter 拿到所有请求及响应数据， 并进行过滤处理
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    // const { User } = response
    // console.log('🚀 ~ user:', User)
    const httpStatus = exception instanceof HttpException  ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let  errMsg = exception?.message || HttpException.name
    const clientIp = requestIp.getClientIp(request)

    if( exception?.errno == 1062){
      // 这样拦截有缺点， 每次请求错误表格id会自增一位  // 
      errMsg = `传入的值与表格已有数据重复，具体原因: ${exception.sqlMessage}`
    }

    if( httpStatus == 400){ // 过滤ValidationPipe错误
      errMsg = `数据格式validate校验出错,错误信息: ${exception.response.message}`
    }

    let resData = {
      statusCode: httpStatus,
      timestamp: new Date().toLocaleString(), // 转成本地时区时间
      path: request.url,
      ip: clientIp,
      error: errMsg
    }
    // console.log('🚀 ~ file: all-exception.ts:47 ~ resData:', resData)
    //  因为已经 全局 替换了 logger?????
    const logService = new LogService()  // 获得log服务 进行 新增 日志
    // const { username, nickname } = request['user']
    const jkhj = request['user']
    console.log('🚀 ~ file: all-exception.ts:54 ~ jkhj:', jkhj)


    // logService.addLog({path: request.url, ip: clientIp, username, nickname})
    Logger.error(`请求出现意外错误, 错误信息: ${JSON.stringify(resData) }`)

    httpAdapter.reply(response, resData, httpStatus);
    // response
    //   .status(status)
    //   .json(resData)
    }
}