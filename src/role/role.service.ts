import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import adminList from './list'
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Roles) private readonly rolesRepository:  //  调用数据库必须进行注入
    Repository<Roles>,
  ){}
  
  getMenu(roleName: string) {
    if(roleName === '超级管理员') {
      return adminList
    }else {
       let testList = [{
            path: '/dashboard',
        component: '#',
        redirect: '/dashboard/workplace',
        name: 'Dashboard',
        meta: {
          title: 'router.dashboard',
          icon: 'ant-design:dashboard-filled',
          alwaysShow: true
        },
        children: [
          {
            path: 'workplace',
            component: 'views/Dashboard/Workplace',
            name: 'Workplace',
            meta: {
              title: 'router.workplace',
              noCache: true,
              affix: true
            }
          }
        ]
      }]

      return testList
    
  }
  };

  async findAllRoles(){
    const res = await this.rolesRepository.find();
    // console.log('🚀 ~ file: role.service.ts:52 ~ RoleService ~ findAllRoles ~ res:', res)
    return res
  }

  async addRole(createRoleDto: CreateRoleDto){
    const roleSave:any = this.rolesRepository.create(createRoleDto)
    const res = await this.rolesRepository.save(roleSave)
    // console.log('🚀 ~ file: role.service.ts:59 ~ RoleService ~ addRole ~ res:', res)
    return res
  }

  //  删除角色
  async removeRole(id: number){
    const res = await this.rolesRepository.delete(id)
    //  删除操作返回数据 { 'raw': [], 'affected': 1 | 0 }
    return res
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
