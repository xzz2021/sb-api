import { Module, forwardRef } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Roles } from './entities/role.entity';
import { Menus } from 'src/menu/entities/menu.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/userinfo/entities/userinfo.entity';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles, Menus ]),
    // forwardRef(() => MenuModule)
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
