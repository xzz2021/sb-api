// 此模块是权限分配表, 包含菜单, 无限层级, 按钮作为虚拟菜单的一部分, 如果当前菜单有操作按钮, 则每个的最后一级'菜单'都是按钮
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metas } from './entities/meta.entity';
import { Menus } from './entities/menu.entity';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ Menus, Metas ]),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
