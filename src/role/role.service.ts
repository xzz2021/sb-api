import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import adminList from './list'
@Injectable()
export class RoleService {
  
  getMenu(roleName: string) {
    if(roleName === 'superAdmin') {
      return {
        data: adminList
      } 
    }else {
        return {
          data:[{
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
    }
  }
    
  };

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
