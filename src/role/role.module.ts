import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Roles } from './entities/role.entity';
import { Menus } from 'src/menu/entities/menu.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/userinfo/entities/userinfo.entity';

import { MenuService } from 'src/menu/menu.service';
import { Metas } from 'src/menu/entities/meta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles, Menus, Metas ]),
    // forwardRef(() => MenuModule)
  ],
  controllers: [RoleController],
  providers: [RoleService, MenuService],
})
export class RoleModule {}
