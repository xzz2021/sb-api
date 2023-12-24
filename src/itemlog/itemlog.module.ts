import { Module } from '@nestjs/common';
import { ItemlogService } from './itemlog.service';
import { ItemlogController } from './itemlog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itemlog } from './entities/itemlog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Itemlog ])],
  controllers: [ItemlogController],
  providers: [ItemlogService],
})
export class ItemlogModule {}
