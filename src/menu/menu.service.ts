import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Menus } from './entities/menu.entity';
import { Metas } from './entities/meta.entity';

@Injectable()
export class MenuService {

  constructor(
    @InjectRepository(Menus) private readonly menuRepository:  //  调用数据库必须进行注入
    Repository<Menus>,
    @InjectRepository(Metas) private readonly metaRepository:  //  调用数据库必须进行注入
    Repository<Metas>,
  ){}


  async getAllMenu(){
    const result = await this.menuRepository.find()
    console.log('🚀 ~ file: role.service.ts:51 ~ RoleService ~ getAllMenu ~ result:', result)
    return result
  }


  async addMenu(createMenuDto: CreateMenuDto) {

    const menuSave: any = await this.menuRepository.create(createMenuDto)
    console.log('🚀 ~ file: menu.service.ts:31 ~ MenuService ~ addMenu ~ menuSave:', menuSave)
    const res = await this.menuRepository.save(menuSave)
    console.log('🚀 ~ file: menu.service.ts:32 ~ MenuService ~ addMenu ~ res:', res)
    return 'test'
    const metaSave: any = this.metaRepository.create(menuSave.meta)
    // console.log('🚀 ~ file: role.service.ts:59 ~ RoleService ~ addRole ~ res:', res)
    return 'This action adds a new permission';
  }
  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new permission';
  }

  findAll() {
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
