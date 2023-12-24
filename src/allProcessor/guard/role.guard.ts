
// // 此处作为角色守卫  返回true or false
// // 可以对用户角色进行判断  决定是否放行

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleArr } from './roles.enum';
import { ROLES_KEY } from './roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // getAllAndOverride   读取路由的metadata
    const requiredRoles = this.reflector.getAllAndOverride<RoleArr[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true;
    }
    // const data = context.switchToHttp().getRequest()
    const { user, route } = context.switchToHttp().getRequest()
    // if(route.path == '')   //  公共接口 没有走 jwt 解析   最好 设定  路由白名单  //  不需要  用户登录后必定存在
    if(!user) return true   // user 不存在     直接  拒绝
    let userRole = user?.role?.roleName
    if(userRole == '超级管理员') return true
    return requiredRoles.some((role) => role == userRole);
  }
}