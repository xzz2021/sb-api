import { Injectable } from '@nestjs/common';
import { CreatePermissionListDto } from './dto/create-permission-list.dto';
import { UpdatePermissionListDto } from './dto/update-permission-list.dto';

@Injectable()
export class PermissionListService {
  create(createPermissionListDto: CreatePermissionListDto) {
    return 'This action adds a new permissionList';
  }

  findAll() {
    return `This action returns all permissionList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionList`;
  }

  update(id: number, updatePermissionListDto: UpdatePermissionListDto) {
    return `This action updates a #${id} permissionList`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionList`;
  }
}
