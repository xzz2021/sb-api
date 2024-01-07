import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false, 
      secretOrKey: config.get('jwtSecret')
    });
  }
  async validate(payload: any) {
    //此处return的信息 在被装饰接口里使用@Req  会自动生成在req.user中 供使用
    // const { username, rolesArr } = payload
    // const { username } = payload
    // 所以 payload 其实 也可以只存储 userid  或 其他 唯一值  unique
    //  所以 此处 也可以  根据用户id  查询 任意信息  并返回  给Req使用
    return payload
  }
}