import { Module } from '@nestjs/common';
import { OnlineplayerService } from './onlineplayer.service';
import { OnlineplayerController } from './onlineplayer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Onlineplayer } from './entities/onlineplayer.entity';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  // host: process.env.DBHOST2,
  // port: 3306,
  // username: process.env.DBUSER2,
  // password: process.env.DBPWD2,
  // database: 'pc_202309171442_log',
  // entities: [LogdataOnlierolecount],
  // synchronize: !false,
  // timezone: "Z", //  
  //   }),
  //   TypeOrmModule.forFeature([ LogdataOnlierolecount ]),
  // ],
  imports: [TypeOrmModule.forFeature([ Onlineplayer ])],
  controllers: [OnlineplayerController],
  providers: [OnlineplayerService],
})
export class OnlineplayerModule {}
