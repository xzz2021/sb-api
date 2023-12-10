import { ForbiddenException, Injectable } from '@nestjs/common';  
// import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { JwtService } from '@nestjs/jwt';
// import { UserinfoService } from 'src/userinfo/userinfo.service';

import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/userinfo.entity';
import { Repository } from 'typeorm';
import { Roles } from 'src/role/entities/role.entity';
import { Permissions } from 'src/permissions/entities/permission.entity';


@Injectable()
export class UserinfoService {
  
      constructor(
        @InjectRepository(Users) private readonly userinfoRepository:  //  调用数据库必须进行注入
        Repository<Users>,
        @InjectRepository(Roles) private readonly rolesRepository:  //  调用数据库必须进行注入
        Repository<Roles>,
        @InjectRepository(Permissions) private readonly permissionsRepository:  //  调用数据库必须进行注入
        Repository<Permissions>,
        private jwtService: JwtService
      ){}
    
      // 创建用户的post请求会走向这里
      async create(createUsersDto: any) {
    
        const saltOrRounds = 10; // 数值越大速度越慢
    
        createUsersDto.password = await bcrypt.hash(createUsersDto.password, saltOrRounds);
    
        // const salt = await bcrypt.genSalt() // 用于生成salt
        
        // 创建注册用户信息  存储
        const userSave:any = this.userinfoRepository.create(createUsersDto)

        // 查询角色表 存储映射关系
        // 获取  用户 角色  数据库对应的   实例 
        let curUserrole = await this.rolesRepository.findOne({where:{roleName: createUsersDto.userInfo_role}})

        // 给用户角色赋值  //  必须对应存入实例对象{}  否则没有映射 关系
        userSave.roleInfo = curUserrole
    
        //  存储新用户  //  使用save时,若保存的实体有id且存在于数据库,则会自动执行update,没有则insert
        return await this.userinfoRepository.save(userSave)
        // return await this.userinfoRepository.insert([userSave1,userSave2,userSave3,userSave4])  //批量存储 插入
    
      }
    
    
      // 通过用户名获取用户信息
      async findOne(username: string) {
        let res = await this.userinfoRepository.findOne({where: {username}, relations: ['roleInfo']})  // 获取基础信息及角色信息
        let { roleId, roleName } = res.roleInfo
        let resInfo = await this.rolesRepository.findOne({where: {roleId},  relations: ['permissions']})  // 根据获取路由权限信息
        // let res2 = await this.rolesRepository.createQueryBuilder('roles')
        //                   .leftJoinAndMapMany('roles.permissions', Permissions, 'permissions', 'roles.permissions3 = permissions.routeLink ')
        //                   .where("roles.roleId = :roleId", { roleId })
        //                   .getMany()
        let permissions = resInfo.permissions.map(item => item.routeLink)
        
        let userinfo= { username: res.username, password: res.password, roleId, roleName, permissions }

        return userinfo
      }
    
       findByID(id: number) {
        return this.userinfoRepository.findOne({ where: {id} })
      }
    

    
      async update(id: number, updateUsersDto: UpdateUserinfoDto) {
        //  貌似应该先通过token确认用户信息，对比id一致，再进行下一步
        let res = await this.userinfoRepository.update(id, updateUsersDto)
        // console.log("🚀 ~ file: demo.service.ts:35 ~ DemoService ~ update ~ res:", res)
        return  res.affected ? '修改成功': '修改失败'
      }
    
      async remove(body) {
        let res = await this.userinfoRepository.delete(body)
        if(res.affected == 1) return { msg: `已删除用户: ${body.username}！`}
        // return await this.userinfoRepository.delete(body)
      }
    
    
      // 通过用户名查询用户信息
      findByUsername(username: string) {
        return this.userinfoRepository.findOne({ where: {username} })
      }



  //--------------------------------------
  // 以下为登录注册认证服务相关代码
  async validateUser(username: string, password: string ): Promise<any> {

    const user = await this.findByUsername(username)

    if(!user){
      throw new ForbiddenException('用户不存在')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) throw new ForbiddenException('用户名或密码错误')
    
    if (user && isMatch) {
        const { username, password } = user;
        return username;
      }
      return null;
    }

    async login(userinfo) {
      const user = await this.findOne(userinfo.username)
      const payload = { username: user.username, role: user.roleName }
      return  {
          userInfo: user,
          tokenKey: this.jwtService.sign(payload),
        }
    }
}
