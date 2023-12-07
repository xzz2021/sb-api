import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserinfoService } from '../userinfo.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userinfoService: UserinfoService) {
    super();
  }
    //  此函数会在useguard装饰后直接执行进行校验
    // 如果传递的是json数据会有异常,所以还是改用表单
  // async validate(username: string, password: string): Promise<any> {
    async validate(username: string, password: string): Promise<any> {
    const user = await this.userinfoService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    // 这里返回用户信息供后面进行payload传token
    return user;
  }
}