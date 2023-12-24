import { Module } from '@nestjs/common';
import { EnumitemService } from './enumitem.service';
import { EnumitemController } from './enumitem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enumitem } from './entities/enumitem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enumitem ]),
  ],
  controllers: [EnumitemController],
  providers: [EnumitemService],
})
export class EnumitemModule {}
