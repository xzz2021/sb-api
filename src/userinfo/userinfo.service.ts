import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
//   argon2  ?更好的 加密 替代品
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentService } from 'src/department/department.service';
import { RoleService } from 'src/role/role.service';
import { In, Repository } from 'typeorm';
import { RegisterDto, UpdateDto } from './dto/userinfo.dto';
import { Users } from './entities/userinfo.entity';



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
      async create(registerDto: RegisterDto) {
    
        const saltOrRounds = 10; // 数值越大速度越慢
    
        registerDto.password = await bcrypt.hash(registerDto.password, saltOrRounds);
    
        // const salt = await bcrypt.genSalt() // 用于生成salt

        // 应该要先查询下用户名是否存在,  存在 抛出异常提示

        
        // 创建注册用户信息  存储
        const userSave:any = this.userinfoRepository.create(registerDto)
        try{
          // 创建时 要先存储这个新生成的用户到数据库里
          const newUser = await this.userinfoRepository.save(userSave)
          return newUser 
        }catch(err) {
          //  错误  抛出异常
        const { code, sqlMessage } = err
        return  { code, message: sqlMessage } 
        }
      }
    
      async update(id: number, updateUsersDto: UpdateDto) {
        //  貌似应该先通过token确认用户信息，对比id一致，再进行下一步
        let res = await this.userinfoRepository.update(id, updateUsersDto)
        return  res.affected ? '修改成功': '修改失败'
      }

      async remove(body) {
        let res = await this.userinfoRepository.delete(body)
        if(res.affected == 1) return { msg: `已删除用户: ${body.username}`}
      }
    
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
      
      // user.role && delete user.role.menusArr2

      // 数据库中用户角色信息是包含多个列信息组成的对象 集合的数组, 所以需要提取出roleName
      // const payload = { username: user.username, role: user.role, nickname: user.nickname}
      const payload = { username: user.username, roleName: user?.role?.roleName || '游客', nickname: user.nickname}
      // const tokenKey = await this.jwtService.signAsync(payload, {expiresIn: '3d', secret: process.env.TOKENSECRET})
      return  {
          userInfo: user,
          tokenKey: this.jwtService.sign(payload)
          // tokenKey
        }
    }


    // async findAllUser() {
    //   const res = await this.userinfoRepository.find()
    //   return res
    // }

    //  管理员 新增   或 修改  用户 信息   同一接口
    async updateUser(updateInfo) {
    // console.log('🚀 ~ file: userinfo.service.ts:215 ~ UserinfoService ~ updateUser ~ updateInfo:', updateInfo)
    //  剔除  新 发来 的  角色 和  部门  id 信息   返回  用户 原有对应信息
    const curUser = await this.userinfoRepository.findOne({where:{id: updateInfo.id}})
    // console.log('🚀 ~ file: userinfo.service.ts:218 ~ UserinfoService ~ updateUser ~ curUser:', curUser)
    // return
    if(!updateInfo.id) throw new NotFoundException('用户信息异常,请稍后再试!')

    const roleId = updateInfo.role.id
    const departmentId = updateInfo.department?.id || updateInfo.department
    if(updateInfo.password){
      curUser.password = await bcrypt.hash(updateInfo.password, 10)
    }else{
        delete updateInfo.password
    }
    const { username, nickname } = updateInfo
    curUser.username = username
    curUser.nickname = nickname

    
      // 先找到对应 id的  角色
      const  curRole = await this.roleService.findRoleById(roleId)
      //  再找到对应的  部门 id
      const  curDepartment = await this.departmentService.findDepartmentById(departmentId)

      curRole && (curUser.role = curRole)
      curDepartment && (curUser.department = curDepartment)

      const res =  await this.userinfoRepository.save(curUser)
        return res

      // if(!curUser.id){ //  id不存在  说明是新增
      //   //   注意 新增还需要  进行 密码  加密  所以 暂时屏蔽 新增功能
      //   const newUserSave =  await this.userinfoRepository.create(curUser)
      //   const res =  await this.userinfoRepository.save(newUserSave)
      //   return res
      
      // }

      

    }

    async deleteUser(ids: number[]){
      //  批量删除用户  理论  会自动 删除关联数据
      const res = await this.userinfoRepository.delete({id: In(ids)})
      return res
    }

    async findWithoutMenu(username){
      const user = await await this.userinfoRepository.findOne({where: {username}, relations: ['role']})
      delete user.role.menusArr
      return user
    }

    async updateSelf(newInfo){
      let { password } = newInfo
      if(password){
        //  如果有更改密码  则走这里
        const saltOrRounds = 10; // 数值越大速度越慢
        newInfo.password = await bcrypt.hash(password, saltOrRounds);
        const { username, ...updateInfo } = newInfo

        const res = await this.userinfoRepository.update({username}, updateInfo)
        if (res.affected == 1) {
        return await this.findWithoutMenu(username)
      }else{
        throw new NotFoundException('信息更改失败!')
        }
      }else{
        const { password, username, ...updateInfo } = newInfo
        const res = await this.userinfoRepository.update({username}, updateInfo)
        if (res.affected == 1) {
          return await this.findWithoutMenu(username)
        }else{
          throw new NotFoundException('信息更改失败!')
          }
      }
      
    }

    async updateAvator(newInfo){
    // console.log('🚀 ~ file: userinfo.service.ts:280 ~ UserinfoService ~ updateAvator ~ newInfo:', newInfo)
    const { avator, username } = newInfo
    const res = await this.userinfoRepository.update({username}, {avator})
    if (res.affected == 1) {
      return res
    }else{
      throw new NotFoundException('头像更改失败!')
      }
    }


}
