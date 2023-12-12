import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Roles } from './entities/role.entity';
import { Menus } from 'src/menu/entities/menu.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/userinfo/entities/userinfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles, Menus ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
