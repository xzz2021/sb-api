import { Module } from '@nestjs/common';
import { OnlineplayerService } from './onlineplayer.service';
import { OnlineplayerController } from './onlineplayer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onlineplayer } from './entities/onlineplayer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Onlineplayer ])],
  controllers: [OnlineplayerController],
  providers: [OnlineplayerService],
})
export class OnlineplayerModule {}
