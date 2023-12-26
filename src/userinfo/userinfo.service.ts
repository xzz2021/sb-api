import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';  
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//   argon2  ?更好的 加密 替代品
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/userinfo.entity';
import { In, Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';
import { DepartmentService } from 'src/department/department.service';



@Injectable()
export class UserinfoService {
  
      constructor(
        @InjectRepository(Users) private readonly userinfoRepository:  //  调用数据库必须进行注入
        Repository<Users>,
        private jwtService: JwtService,
        private readonly roleService: RoleService,
        private readonly departmentService: DepartmentService
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
          //  错误  抛出异常
        const { code, sqlMessage } = err
        return  { code, message: sqlMessage } 
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
        return  { code, sqlMessage } 

        }
        // return await this.userinfoRepository.insert([userSave1,userSave2,userSave3,userSave4])  //批量存储 插入
    
      }

      // 通过用户名获取用户信息
      // async findOne(username: string) {
      //   let res = await this.userinfoRepository.findOne({where: {username}, relations: ['role']})  // 获取基础信息及角色信息
      //   return res
      //   // let { roleId, roleName } = res.rolesArr
      //   // let resInfo = await this.rolesRepository.findOne({where: {roleId},  relations: ['permissions']})  // 根据获取路由权限信息
      //   // // let res2 = await this.rolesRepository.createQueryBuilder('roles')
      //   // //                   .leftJoinAndMapMany('roles.permissions', Permissions, 'permissions', 'roles.permissions3 = permissions.routeLink ')
      //   // //                   .where("roles.roleId = :roleId", { roleId })
      //   // //                   .getMany()
      //   // // let permissions = resInfo.permissions.map(item => item.routeLink)
        
      //   // let userinfo= { username: res.username, password: res.password, roleId, roleName }
      //   // return { username: 'test', rolesArr: [] }
      //   // return userinfo
      // }
    
      //  findByID(id: number) {
      //   return this.userinfoRepository.findOne({ where: {id} })
      // }
    

    
      async update(id: number, updateUsersDto: UpdateUserinfoDto) {
        //  貌似应该先通过token确认用户信息，对比id一致，再进行下一步
        let res = await this.userinfoRepository.update(id, updateUsersDto)
        // console.log("🚀 ~ file: demo.service.ts:35 ~ DemoService ~ update ~ res:", res)
        return  res.affected ? '修改成功': '修改失败'
      }

      async modifyUser(createUsersDto){
        //  修改用户信息
        // const curUser = await this.userinfoRepository.findOne({where: {id: createUsersDto.id}})
        // if(curUser == null) {   //  如果不存在 说明是新增
        //   // 先不处理
        //   return '暂不处理'
        //   const newUserSave = await this.menuRepository.create(createUsersDto)
        //   const res = await this.menuRepository.save(newUserSave)
        //   return res
        // } else {
        //   //  存在  直接存储
        //   const res = await this.menuRepository.save(curUser)
        //   return res
        // }

        //模拟修改
        // const curUser = await this.userinfoRepository.findOne({where: {id: createUsersDto.id}})
        // console.log('🚀 ~ file: userinfo.service.ts:157 ~ UserinfoService ~ modifyUser ~ curUser:', curUser)
        // if(curUser){
        //   const top = await this.departmentsRepository.findOne({where: {id: 1}})
        //   console.log('🚀 ~ file: userinfo.service.ts:159 ~ UserinfoService ~ modifyUser ~ top:', top)
        //   // return ''
        //   curUser.departmentsArr = [top]
        //   const res = await this.menuRepository.save(curUser)
        //   console.log('🚀 ~ file: userinfo.service.ts:169 ~ UserinfoService ~ modifyUser ~ res:', res)
        //   return res
        // }

      }
    
      async remove(body) {
        let res = await this.userinfoRepository.delete(body)
        if(res.affected == 1) return { msg: `已删除用户: ${body.username}`}
      }
    
    
      // 通过用户名查询用户信息
      // findByUsername(username: string) {
      //   return this.userinfoRepository.findOne({ where: {username} })
      // }



  //--------------------------------------
  // 以下为登录认证服务相关代码
  async validateUser(username: string, password: string ): Promise<any> {

    const user = await this.userinfoRepository.findOne({ where: {username} })

    if(!user){
      throw new NotFoundException('用户不存在')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) throw new NotFoundException('用户名或密码错误' )
    
    if (user && isMatch) {
        const { username, password } = user;
        return username;
      }
      return null;
    }

    async login(userinfo) {
      
      // const user = await this.findOne(userinfo.username)
      const user = await await this.userinfoRepository.findOne({where: {username: userinfo.username}, relations: ['role']})
      // 数据库中用户角色信息是包含多个列信息组成的对象 集合的数组, 所以需要提取出roleName
      // const payload = { username: user.username, role: user.role, nickname: user.nickname}
      const payload = { username: user.username, roleName: user.role.roleName, nickname: user.nickname}
      return  {
          userInfo: user,
          tokenKey: this.jwtService.sign(payload)
        }
    }


    // async findAllUser() {
    //   const res = await this.userinfoRepository.find()
    //   return res
    // }

    //  管理员 新增   或 修改  用户 信息   同一接口
    async updateUser(createUsersDto) {
    //  剔除  新 发来 的  角色 和  部门  id 信息   返回  用户 原有对应信息
    const { roleId, departmentId, ...curUser } = createUsersDto
      // 先找到对应 id的  角色
      const  curRole = await this.roleService.findRoleById(roleId)
      //  再找到对应的  部门 id
      const  curDepartment = await this.departmentService.findDepartmentById(departmentId)

      curUser.role = curRole
      curUser.department = curDepartment

      if(!curUser.id){ //  id不存在  说明是新增
        //   注意 新增还需要  进行 密码  加密  所以 暂时屏蔽 新增功能
        const newUserSave =  await this.userinfoRepository.create(curUser)
        const res =  await this.userinfoRepository.save(newUserSave)
        return res
      
      } else {
        const res =  await this.userinfoRepository.save(curUser)
        return res

      }

      

    }

    async deleteUser(ids: number[]){
      //  批量删除用户  理论  会自动 删除关联数据
      const res = await this.userinfoRepository.delete({id: In(ids)})
      return res
    }


}
