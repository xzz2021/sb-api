import { Module } from '@nestjs/common';
import { MoneylogService } from './moneylog.service';
import { MoneylogController } from './moneylog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneylog } from './entities/moneylog.entity';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  // host: process.env.DBHOST2,
  // port: 3306,
  // username: process.env.DBUSER2,
  // password: process.env.DBPWD2,
  // database: 'pc_202309171442_log',
  // entities: [Moneylog],
  // // migrations: ['src/migrations/*{.ts,.js}'],
  // synchronize: false,
  // timezone: "Z", //  
  //   }),
  //   TypeOrmModule.forFeature([ Moneylog ]),
  // ],
  imports: [TypeOrmModule.forFeature([ Moneylog ])],
  controllers: [MoneylogController],
  providers: [MoneylogService],
})
export class MoneylogModule {}
