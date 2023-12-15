import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';
import { MenuService } from 'src/menu/menu.service';
@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Roles) private readonly rolesRepository:  //  调用数据库必须进行注入
    Repository<Roles>,
    private readonly menuService: MenuService
  ){}
  

  async findAllRoles(){
    const res = await this.rolesRepository.find();
    return res
  }


  // 添加角色时会添加菜单
  async addRole(createRoleDto: any){
    console.log('🚀 ~ file: role.service.ts:25 ~ RoleService ~ addRole ~ createRoleDto:', createRoleDto)

    return 'iii'



    // 新增角色时  要考虑 分配菜单  及 权限
    // 000 先拿到当前角色自己所拥有的所有菜单及角色 前端会自动请求menu/list接口
    //  1111 先存菜单   222再存他对应的  关联按钮

    // return 'yyy'
    //  角色拥有的菜单会关联存储
    // const roleSave:any = this.rolesRepository.create(createRoleDto)
    // const curRole = await this.rolesRepository.save(roleSave)
    // console.log('🚀 ~ file: role.service.ts:37 ~ RoleService ~ addRole ~ curRole:', curRole)

    // // 遍历每一个菜单数据拿到  角色  权限list
    // const rolePermissionList = []

    // createRoleDto.menusArr.forEach( (item: any) => {
    //   if(item.newPermissionList && item.newPermissionList.length > 0){
    //     item.newPermissionList.map( (btn: any) => {
    //       //如果是新增  关联菜单  可能无效  //  或者其他人添加 无效
    //       // btn.menuId = item.id
    //       rolePermissionList.push(btn)
    //     })
    //   }
    // })

    // console.log('🚀 ~ file: role.service.ts:41 ~ RoleService ~ addRole ~ rolePermissionList:', rolePermissionList)
    

    // //存储角色对应的permissionList
    // const  curRoleSave = await this.rolesRepository.find({where: {roleName: createRoleDto.roleName}})
    // curRoleSave.permissionList = rolePermissionList
    // const res = await this.rolesRepository.save(roleSave)


    // return res
  }

  //  删除角色
  async removeRole(id: number){
    const res = await this.rolesRepository.delete(id)
    //  删除操作返回数据 { 'raw': [], 'affected': 1 | 0 }
    return res
  }



      //  此处即用户菜单  也带权限表  用于分配
   async getMenuAndPermission(rolesArr: CreateRoleDto[]){
    //  如果是游客
    if(rolesArr.length == 0)  return []
    if(rolesArr.length == 1 && rolesArr[0].roleName == '游客') {
      // 如果是游客, 不用返回数据, 因为没有相关页面
      return []
  }
    //  要同时拿到 用户菜单 和 角色菜单
    //  先判断是否是超级管理员
    const isSuperAdmin = rolesArr.some(item => item.roleName == '超级管理员')
    if(isSuperAdmin){
      // 如果是超级管理员, 直接返回 所有菜单 所有按钮权限
      const allMenuAndPermission = await this.menuService.getAllMenu()
      console.log('🚀 ~ file: role.service.ts:59 ~ RoleService ~ getMenuAndPermission ~ allMenuAndPermission:', allMenuAndPermission)
      // const supAdminMenusArr = await this.rolesRepository.find({ relations: ['menusArr'] })
      return allMenuAndPermission
      // return supAdminMenusArr
    } 
      //  如果是其他用户 []
      // 先遍历出id
      const idArr = rolesArr.map((item: CreateRoleDto) => item.id)
      console.log('🚀 ~ file: role.service.ts:66 ~ RoleService ~ getMenuAndPermission ~ idArr:', idArr)
      return 'ttt'
      // 先找到所有角色的 关联菜单 去重  
      // const getAllMenu = await this.rolesRepository.find({where:{id: In([rolesArr])}})
      // const roleMenusArr = await this.menuRepository.find({where:{rolesArr: In([rolesArr])}})
      // console.log('🚀 ~ file: menu.service.ts:45 ~ MenuService ~ getMenuAndPermission ~ roleMenusArr:', roleMenusArr)
      // const permissionList = await this.menuRepository.find({where:{rolesArr: In([rolesArr])}})
      // console.log('🚀 ~ file: menu.service.ts:47 ~ MenuService ~ getMenuAndPermission ~ permissionList:', permissionList)
  
    }



  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
