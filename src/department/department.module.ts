import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departments } from './entities/department.entity';
import { Users } from 'src/userinfo/entities/userinfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Departments, Users ]),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
