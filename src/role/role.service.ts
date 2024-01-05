import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';
import { MenuService } from 'src/menu/menu.service';
import adminList from './list'
import guestMenu from './guestMenu'

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Roles) private readonly rolesRepository:  //  调用数据库必须进行注入
    Repository<Roles>,
    private readonly menuService: MenuService
  ){}
  
  rTime(date) {  // 转换日期 时间 格式
    // var json_date = new Date(date).toJSON();
    return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}
  async findAllRoles(){
    const res = await this.rolesRepository.find();
    // let newRes = []
    // if (res.length > 0) {
    //    newRes = res.map((item) => {
    //     item.createTime = this.rTime(item.createTime)
    //     return item
    //   })
    // } else {
    //   return []
    // }

    return res
  }

  async findAllRoles2(){
    // 查询角色  并获取到所有关联 菜单
    const res = await this.rolesRepository.find({relations: ['menusArr', 'metaPermission']})
    const allRolesWithoutSuper = res.slice(1)
    const newMenu = allRolesWithoutSuper.map((item) => {
       const { menusArr, metaPermission } = item
       const newMenusArr = menusArr.map((menu) => {
        menu.permissionList && (menu.permissionList = JSON.parse(menu.permissionList))
        const permissionItem = metaPermission.find(item => item.menuId === menu.id)
        menu.meta.permission =  permissionItem?.permission ? JSON.parse(permissionItem.permission) : []
        return menu
       })
       delete item.metaPermission
       item.menusArr = newMenusArr
       return item
      })

     return newMenu
  }
  async findRoleById(id: number){
    const res = await this.rolesRepository.findOne({where: { id }});
    return res
  }

  async findAllRolesId(){
    // 返回 所有 角色信息  供用户管理 模块  进行下拉选择
    const res = await this.rolesRepository.find();
    return res
  }


  // 添加角色时会添加菜单
  async addRole(createRoleDto: any){
    // console.log('🚀 ~ file: role.service.ts:25 ~ RoleService ~ addRole ~ createRoleDto:', createRoleDto)

    //  添加  和  修改 会 同时请求  同一个  接口
    //  先判断  是否存在
  const curRole: any = await this.rolesRepository.findOne({where: { roleName: createRoleDto.roleName } })
  if(createRoleDto.menusArr && createRoleDto.menusArr.length > 0 ){
    createRoleDto.menusArr = JSON.stringify(createRoleDto.menusArr)
    // createRoleDto.menusArr = createRoleDto.menusArr
  }
  // console.log('🚀 ~ file: role.service.ts:34 ~ RoleService ~ addRole ~ createRoleDto:', createRoleDto)
  if(curRole == null) {   //  如果不存在 说明是新增
    const newRoleSave = await this.rolesRepository.create(createRoleDto)
    const res = await this.rolesRepository.save(newRoleSave)
    return res
  } else {
    //  存在  直接存储
    curRole.menusArr = createRoleDto.menusArr
    const res = await this.rolesRepository.save(curRole)
    return res
  }


  

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

    // 添加角色时会添加菜单
    async addRole2(createRoleDto: any){
      //  添加  和  修改 会 同时请求  同一个  接口
      //  先判断  是否存在
      let curRole: any = await this.rolesRepository.findOne({where: { id: createRoleDto.id || -1 } })
      
      if(curRole == null) {   //  如果不存在 说明是新增
        curRole = await this.rolesRepository.create(createRoleDto)
      }else{
      const { remark, status, roleName } = createRoleDto
      curRole.remark = remark
      curRole.status = status
      curRole.roleName = roleName
    }
    //  首先 确定需要存储的 菜单
    if(createRoleDto.menusArr) {
      const newMenusArr = createRoleDto.menusArr.map((item)=> {
        if(item.permissionList){
          item.permissionList = JSON.stringify(item.permissionList)
        }
        item?.meta?.permission && delete item.meta.permission
        return item
      })
      curRole.menusArr = newMenusArr
    }
    if(createRoleDto.metaPermission) {
      const metaPermissionArr = createRoleDto.metaPermission.map((item)=>{
        item.permission && (item.permission = JSON.stringify(item.permission))
        return item
      })
      curRole.metaPermission = metaPermissionArr
    }
    
      const res = await this.rolesRepository.save(curRole)
      return res
    
  }

  //  删除角色
  async removeRole(id: number){
    const res = await this.rolesRepository.delete(id)
    //  删除操作返回数据 { 'raw': [], 'affected': 1 | 0 }
    return res
  }

  

      //  此处即用户菜单  也带权限表  
   async getMenuByRole(roleName: string){
    //  如果是新注册用户 只返回工作台菜单
    if(!roleName)  return guestMenu
    const formatToTree = (ary: any[], pid: number | undefined) => {
      return ary
        .filter((item) =>
          // 如果没有父id（第一次递归的时候）将所有父级查询出来
          // 这里认为 item.parentId === 1 就是最顶层 需要根据业务调整
          pid === undefined ? item.parentId === null : item.parentId === pid
        )
        .map((item2) => {
          // 通过父节点ID查询所有子节点
          item2.children = formatToTree(ary, item2.id)
          return item2
        })
    }
    //  要同时拿到 用户菜单 和 角色菜单
    //  先判断是否是超级管理员
    // const isSuperAdmin = rolesArr.some(item => item.roleName == '超级管理员')
    if(roleName == '超级管理员'){
      adminList.map((item) => {
        item['title'] = item.meta ? item.meta?.title || '' : ''
      })
      const allMenuAndPermission = await this.menuService.getAllMenu()

      // console.log('🚀 ~ file: role.service.ts:113 ~ RoleService ~ getMenuByRole ~ allMenuAndPermission:', allMenuAndPermission)
      //  数据库取出 的  是扁平的  需要转换下????????????????
      // const databaseMenu = formatToTree(allMenuAndPermission, undefined)
      // // 拿到所有菜单  生成嵌套数据
      let newData = [...allMenuAndPermission, ...adminList]
      return newData
    }
      // 其他角色  直接 拿到角色表对应的  菜单  目前角色  只分配一个
      const curRole = await this.rolesRepository.findOne({where: {roleName: roleName}, relations: ['menusArr']})
      //  先拿到  角色对应的  菜单
      if(!curRole.menusArr) return '角色关联 菜单 数据异常'
      const roleMenus = curRole.menusArr.map(item => {
        delete item.permissionList
        if(item.meta && item.meta.permission){
          item.meta.permission = JSON.parse(item.meta.permission)
        }
        return item
      })
      return roleMenus
      let nestedMenus = formatToTree(roleMenus, undefined)
      return nestedMenus
    }

}
