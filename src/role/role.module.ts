import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Roles } from './entities/role.entity';
import { Menus } from 'src/menu/entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuService } from 'src/menu/menu.service';
import { Metas } from 'src/menu/entities/meta.entity';
import { MetaPermission } from './entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Roles, Menus, Metas, MetaPermission])
  ],
  controllers: [RoleController],
  providers: [RoleService, MenuService],
})
export class RoleModule {}
