import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Roles } from './entities/role.entity';
import { Permissions } from 'src/permissions/entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/userinfo/entities/userinfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Roles, Permissions ]),
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
