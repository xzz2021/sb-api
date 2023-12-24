import { Module } from '@nestjs/common';
import { MoneylogService } from './moneylog.service';
import { MoneylogController } from './moneylog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneylog } from './entities/moneylog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Moneylog ])],
  controllers: [MoneylogController],
  providers: [MoneylogService],
})
export class MoneylogModule {}
