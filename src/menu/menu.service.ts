import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMenuDto } from './dto/update-menu.dto';
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

   formatToTree (ary: any[], pid: number | undefined) {
    return ary
      .filter((item) =>
        // 如果没有父id（第一次递归的时候）将所有父级查询出来
        // 这里认为 item.parentId === 1 就是最顶层 需要根据业务调整
        pid === undefined ? item.parentId === null : item.parentId === pid
      )
      .map((item) => {
        // 通过父节点ID查询所有子节点
        item.children = this.formatToTree(ary, item.id)
        return item
      })
  }

  async getAllMenu(){
    const allMenus = await this.menuRepository.find()
    
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
      // 拿到所有菜单  生成嵌套数据
      let newData = this.formatToTree(newMenus, undefined)
      // console.log('🚀 ~ file: menu.service.ts:50 ~ MenuService ~ getAllMenu ~ newData:', newData)
      return newData
  }


  async addMenu(menu: CreateMenuDto) {
    // 添加 时传递的 是 带permissionList数组的 数据    需要 转换成json 字符串 存储
    if(menu.permissionList  && menu.permissionList.length > 0 ) {
      menu.permissionList = JSON.stringify(menu.permissionList)
    }
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
}
