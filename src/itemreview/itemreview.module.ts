import { Module } from '@nestjs/common';
import { ItemreviewService } from './itemreview.service';
import { ItemreviewController } from './itemreview.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itemreview } from './entities/itemreview.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Itemreview ]),
  ],
  controllers: [ItemreviewController],
  providers: [ItemreviewService],
})
export class ItemreviewModule {}
