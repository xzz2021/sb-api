import { Module } from '@nestjs/common';
import { PermissionListService } from './permission-list.service';
import { PermissionListController } from './permission-list.controller';
import { PermissionLists } from './entities/permission-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionLists ]),
    // forwardRef(() => MenuModule)
  ],
  controllers: [PermissionListController],
  providers: [PermissionListService],
})
export class PermissionListModule {}
