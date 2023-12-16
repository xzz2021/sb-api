import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menus } from './entities/menu.entity';
import { Metas } from './entities/meta.entity';
import adminList from './list';

@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(Menus) private readonly menuRepository:  //  调用数据库必须进行注入
    Repository<Menus>,
    @InjectRepository(Metas) private readonly metaRepository:  //  调用数据库必须进行注入
    Repository<Metas>,
  ){}


  async getAllMenu(){
    //  
    const formatToTree = (ary: any[], pid: number | undefined) => {
      return ary
        .filter((item) =>
          // 如果没有父id（第一次递归的时候）将所有父级查询出来
          // 这里认为 item.parentId === 1 就是最顶层 需要根据业务调整
          pid === undefined ? item.parentId === null : item.parentId === pid
        )
        .map((item) => {
          // 通过父节点ID查询所有子节点
          item.children = formatToTree(ary, item.id)
          return item
        })
    }
    const allMenus = await this.menuRepository.find()
    
    const newMenus= allMenus.map(item => {
      if(item.permissionList && item.permissionList.length > 0) {
        item.permissionList = JSON.parse(item.permissionList)
      }
      return item
    })
      console.log('🚀 ~ file: menu.service.ts:43 ~ MenuService ~ newMenus ~ newMenus:', newMenus)
      // 拿到所有菜单  生成嵌套数据
      let newData = formatToTree(newMenus, undefined)
      return newData
  }

    //  此处只是返回用户菜单  不带权限表  让用户登录时有左侧菜单
  // async getMenu(rolesArr: any[]) {
  //   if(rolesArr.length == 1 && rolesArr[0].roleName == '游客') {
  //     // 如果是游客, 只返回 首页的游客一表
  //     const guestMenusArr = await this.menuRepository.find({where:{id: In([1, 2])}})
  //     console.log('🚀 ~ file: menu.service.ts:32 ~ MenuService ~ getMenu ~ guestMenusArr:', guestMenusArr)
  //     return guestMenusArr

  // }else {
  //   const supAdminMenusArr = await this.menuRepository.find()
  //     return supAdminMenusArr
  //   // return adminList
      
  //   }
  //   };


    


  async addMenu(menu: CreateMenuDto, rolesArr: any) {
    // 添加 时传递的 是 带permissionList数组的 数据    需要 转换成json 字符串 存储
    if(menu.permissionList  && menu.permissionList.length > 0 ) {
      menu.permissionList = JSON.stringify(menu.permissionList)
    }
    console.log('🚀 ~ file: menu.service.ts:66 ~ MenuService ~ addMenu ~ menu.permissionList:', menu.permissionList)
  const curMenu: any = await this.menuRepository.findOne({where: { name: menu.name } })
  console.log('🚀 ~ file: menu.service.ts:68 ~ MenuService ~ addMenu ~ curMenu:', curMenu)
  if(curMenu == null) {   //  如果不存在 说明是新增
    const newMenuSave = await this.menuRepository.create(menu)
    const res = await this.menuRepository.save(newMenuSave)
    return res
  } else {
    //  存在  直接存储
    curMenu.permissionList = menu.permissionList
    curMenu.meta = menu.meta
    const res = await this.menuRepository.save(curMenu)
    return res
  }
}

  //   //  批量插入
  //   const res = await this.menuRepository.save(menu);


  //   return res

  // name 是 唯一值  先 查询是否存在
//   const curMenu: any = await this.menuRepository.findOne({where: { name: createMenuDto.name } })

//   if(curMenu == null) {   //  如果不存在 说明是新增
//     // 说明是新增
//     // 需要先存储好新增的菜单项目  并拿到id
//     const newMenuSave = await this.menuRepository.create(createMenuDto)
//     // 进行存储
//     const res = await this.menuRepository.save(newMenuSave)
    
//     if(createMenuDto.permissionList && createMenuDto.permissionList.length > 0) {
//       const getNewMenu = await this.menuRepository.findOne({where: { name: createMenuDto.name } })
//       //  手动管理 超级管理员
//       const permission = createMenuDto.permissionList
//       permission.map((item: any) => {
//       item.roleId = 1
//     })
//     // 先存储{label,value} 当前菜单id
//     getNewMenu.permissionList = permission
//     // const menuSave: any = await this.menuRepository.create(createMenuDto)
//     const res2 = await this.menuRepository.save(getNewMenu)

//     //  还有存储相关的角色对应关系
//     return res2
//     }
//     return res

//   } else {
//     // 否则就不是新增  说明是修改  可以直接存储
//     const res3 = await this.menuRepository.save(createMenuDto)
//     return res3
// }

  async modifyMenu(createMenuDto: CreateMenuDto) {
    // console.log('🚀 ~ file: menu.service.ts:83 ~ MenuService ~ modifyMenu ~ createMenuDto:', createMenuDto)
    // createMenuDto.parentId = 3
    const curMenu = await this.menuRepository.findOne({where: {path: createMenuDto.path}})
    // console.log('🚀 ~ file: menu.service.ts:86 ~ MenuService ~ modifyMenu ~ curMenu:', curMenu)
    if(createMenuDto.permissionList && createMenuDto.permissionList != '') {
    curMenu.permissionList = JSON.stringify(createMenuDto.permissionList)
    const res = await this.menuRepository.save(curMenu)
    return res
  }
}

  findAll() {
    return `This action returns all permissions`;
  }

  create() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
