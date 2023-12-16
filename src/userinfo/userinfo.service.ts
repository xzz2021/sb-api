import { ForbiddenException, Injectable } from '@nestjs/common';  
// import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { JwtService } from '@nestjs/jwt';
// import { UserinfoService } from 'src/userinfo/userinfo.service';

import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/userinfo.entity';
import { In, Repository } from 'typeorm';
import { Roles } from 'src/role/entities/role.entity';
import { Menus } from 'src/menu/entities/menu.entity';



@Injectable()
export class UserinfoService {
  
      constructor(
        @InjectRepository(Users) private readonly userinfoRepository:  //  调用数据库必须进行注入
        Repository<Users>,
        @InjectRepository(Roles) private readonly rolesRepository:  //  调用数据库必须进行注入
        Repository<Roles>,
        @InjectRepository(Menus) private readonly menuRepository:  //  调用数据库必须进行注入
        Repository<Menus>,
        private jwtService: JwtService
      ){}
    
      // 创建用户的post请求会走向这里
      async create(createUsersDto: any) {
    
        const saltOrRounds = 10; // 数值越大速度越慢
    
        createUsersDto.password = await bcrypt.hash(createUsersDto.password, saltOrRounds);
    
        // const salt = await bcrypt.genSalt() // 用于生成salt

        // 应该要先查询下用户名是否存在,  存在 抛出异常提示

        
        // 创建注册用户信息  存储
        const userSave:any = this.userinfoRepository.create(createUsersDto)
        try{
          // 创建时 要先存储这个新生成的用户到数据库里
          await this.userinfoRepository.save(userSave)
          // return res 
        }catch(err) {
          //  错误不用返回  直接抛出异常
        const { code, sqlMessage } = err
        console.log('🚀 ~ file: userinfo.service.ts:71 ~ UserinfoService ~ create ~ sqlMessage:', sqlMessage)
        // return  { code, sqlMessage } 
        }

        const {  username } = createUsersDto

        // 然后找到此用户实体
        const currentUser = await this.userinfoRepository.findOne({where: {username}})
        //  如果是新注册用户  必定是游客身份   直接存储此身份
        if(!createUsersDto.role){
          createUsersDto.role = {
            "id": 2,
            "roleName": "游客",
            "remark": "",
            "status": 1,
            "createTime": "2023-12-14T01:27:25.059Z",
            "updateTime": "2023-12-14T01:27:25.059Z",
            "deleteTime": null
        }
        }

        //  超级管理员临时注册-------------------
        //   createUsersDto.rolesArr = [{
        //     "id": 1,
        //     "roleName": "超级管理员",
        //     "remark": "",
        //     "status": 1,
        //     "createTime": "2023-12-14T01:27:09.471Z",
        //     "updateTime": "2023-12-14T01:27:09.471Z",
        //     "deleteTime": null
        // }]
        //--------------------------------------



            currentUser.role = createUsersDto.role
        try{
          const  res =  await this.userinfoRepository.save(currentUser)
          return res 
        }catch(err) {
          //  错误不用返回  直接抛出异常
        const { code, sqlMessage } = err
        console.log('🚀 ~ file: userinfo.service.ts:71 ~ UserinfoService ~ create ~ sqlMessage:', sqlMessage)
        // return  { code, sqlMessage } 

        }
        // return await this.userinfoRepository.insert([userSave1,userSave2,userSave3,userSave4])  //批量存储 插入
    
      }


      //  此处为新增用户操作
      addUser(createUsersDto: any) {

      }

      
    
    
      // 通过用户名获取用户信息
      async findOne(username: string) {
        let res = await this.userinfoRepository.findOne({where: {username}})  // 获取基础信息及角色信息
        return res
        // let { roleId, roleName } = res.rolesArr
        // let resInfo = await this.rolesRepository.findOne({where: {roleId},  relations: ['permissions']})  // 根据获取路由权限信息
        // // let res2 = await this.rolesRepository.createQueryBuilder('roles')
        // //                   .leftJoinAndMapMany('roles.permissions', Permissions, 'permissions', 'roles.permissions3 = permissions.routeLink ')
        // //                   .where("roles.roleId = :roleId", { roleId })
        // //                   .getMany()
        // // let permissions = resInfo.permissions.map(item => item.routeLink)
        
        // let userinfo= { username: res.username, password: res.password, roleId, roleName }
        // return { username: 'test', rolesArr: [] }
        // return userinfo
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
        if(res.affected == 1) return { msg: `已删除用户: ${body.username}`}
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
      // 数据库中用户角色信息是包含多个列信息组成的对象 集合的数组, 所以需要提取出roleName
      const payload = { username: user.username, role: user.role }
      return  {
          userInfo: user,
          tokenKey: this.jwtService.sign(payload),
        }
    }
}
