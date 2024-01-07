import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatToTree } from 'src/allProcessor/fn/xzzfn';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menus } from './entities/menu.entity';

@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(Menus) private readonly menuRepository:  //  调用数据库必须进行注入
    Repository<Menus>,
    // @InjectRepository(Metas) private readonly metaRepository:  //  调用数据库必须进行注入
    // Repository<Metas>,
  ){}

  async getAllMenu(){
    const allMenus = await this.menuRepository.find()
    //  移除 角色中的 第一个 --- 超级管理员
    // const allMenusWithoutSuper = allMenus.slice(1)
    const newMenus= allMenus.map(item => {
      if(item.permissionList) {
        item.permissionList = JSON.parse(item.permissionList)
      }else{
        delete item.permissionList
      }
      if(item?.meta?.permission) {
        item.meta.permission = JSON.parse(item.meta.permission)
      }else{
        delete item.meta.permission
      }
      return item
    })
    // return newMenus
      // 拿到所有菜单  生成嵌套数据
      let newData = formatToTree(newMenus, undefined)
      return newData
  }

  async getMenuIdAndTitle(){
    const res =  await this.menuRepository.find({ select: ["id", "parentId", "title"] })
    const newData =  formatToTree(res, undefined)
    return newData
  }


  async addMenu(menu: CreateMenuDto) {
    // 添加 时传递的 是 带permissionList数组的 数据    需要 转换成json 字符串 存储
      menu.permissionList && (menu.permissionList = JSON.stringify(menu.permissionList))

    menu.meta && menu.meta.permission && delete menu.meta.permission 
    menu.children &&  delete menu.children
  let curMenu: any = await this.menuRepository.findOne({where: { name: menu.name } })
  if(curMenu == null) {   //  如果不存在 说明是新增
    curMenu = await this.menuRepository.create(menu)
  } 
  curMenu = menu
    const res = await this.menuRepository.save(curMenu)
    return res
}


//   async modifyMenu(createMenuDto: CreateMenuDto) {
//     // createMenuDto.parentId = 3
//     const curMenu = await this.menuRepository.findOne({where: {path: createMenuDto.path}})
//     if(createMenuDto.permissionList && createMenuDto.permissionList != '') {
//     curMenu.permissionList = JSON.stringify(createMenuDto.permissionList)
//     const res = await this.menuRepository.save(curMenu)
//     return res
//   }
// }

  //删除 菜单
  async removeMenu(id: number) {
    const res = await this.menuRepository.delete(id)
    return res;
  }

  // 用于 更新 父级菜单的顺序
  async updateSort(sortMenu){
    const l = sortMenu.length
    let affected = 0
     await Promise.all(sortMenu.map(async (item)=> {
      const { id, sort } = item
      const res = await this.menuRepository.update(id, {sort})
      res.affected && affected++
    }))
    if(affected == l) {
      return { affected: affected}
  }else{
    throw new BadRequestException('信息更改失败!')
  }
}
}
