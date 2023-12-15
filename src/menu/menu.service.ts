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
    const result = await this.menuRepository.find({relations: ['permissionList']})
    return result
  }

    //  此处只是返回用户菜单  不带权限表  让用户登录时有左侧菜单
  async getMenu(rolesArr: any[]) {
    if(rolesArr.length == 1 && rolesArr[0].roleName == '游客') {
      // 如果是游客, 只返回 首页的游客一表
      const guestMenusArr = await this.menuRepository.find({where:{id: In([1, 2])}})
      console.log('🚀 ~ file: menu.service.ts:32 ~ MenuService ~ getMenu ~ guestMenusArr:', guestMenusArr)
      return guestMenusArr

  }else {
    const supAdminMenusArr = await this.menuRepository.find()
      return supAdminMenusArr
    // return adminList
      
    }
    };


    


  async addMenu(createMenuDto: CreateMenuDto, rolesArr: any[]) {
  console.log('🚀 ~ file: menu.service.ts:72 ~ MenuService ~ addMenu ~ createMenuDto:', createMenuDto)

  // name 是 唯一值  先 查询是否存在
  const curMenu: any = await this.menuRepository.findOne({where: { name: createMenuDto.name } })

  if(curMenu == null) {   //  如果不存在 说明是新增
    // 说明是新增
    // 需要先存储好新增的菜单项目  并拿到id
    const newMenuSave = await this.menuRepository.create(createMenuDto)
    // 进行存储
    const res = await this.menuRepository.save(newMenuSave)
    
    if(createMenuDto.permissionList && createMenuDto.permissionList.length > 0) {
      const getNewMenu = await this.menuRepository.findOne({where: { name: createMenuDto.name } })
      //  手动管理 超级管理员
      const permission = createMenuDto.permissionList
      permission.map((item: any) => {
      item.roleId = 1
    })
    // 先存储{label,value} 当前菜单id
    getNewMenu.permissionList = permission
    // const menuSave: any = await this.menuRepository.create(createMenuDto)
    const res2 = await this.menuRepository.save(getNewMenu)

    //  还有存储相关的角色对应关系
    return res2
    }
    return res

  } else {
    // 否则就不是新增  说明是修改  可以直接存储
    const res3 = await this.menuRepository.save(createMenuDto)
    return res3
}
  }

  async modifyMenu(createMenuDto: CreateMenuDto) {
    console.log('🚀 ~ file: menu.service.ts:83 ~ MenuService ~ modifyMenu ~ createMenuDto:', createMenuDto)
    // createMenuDto.parentId = 3
    const curMenu = await this.menuRepository.findOne({where: {path: createMenuDto.path}})
    console.log('🚀 ~ file: menu.service.ts:86 ~ MenuService ~ modifyMenu ~ curMenu:', curMenu)
    const res = await this.menuRepository.save(curMenu)

    return res
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
