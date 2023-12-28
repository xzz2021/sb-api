import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//  此处  定义  自定义的 装饰器   用于  @Req()  req.user   而自定义后 可以直接返回 user
/* 
@Get()
async any(@Req() req:unknow){
    const user = req.user
}

======>

@Get()
async any(@getUser() user:unknow){
    const user = user
}

*/
export const getUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if(data){ //  如果有参数 则 返回对应参数值
        return request.user[data]
    }
    return request.user;
  },
);