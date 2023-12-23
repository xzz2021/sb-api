import { Module } from '@nestjs/common';
import { ItemlogService } from './itemlog.service';
import { ItemlogController } from './itemlog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itemlog } from './entities/itemlog.entity';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'mysql',
  // host: process.env.DBHOST2,
  // port: 3306,
  // username: process.env.DBUSER2,
  // password: process.env.DBPWD2,
  // database: 'pc_202309171442_log',
  // entities: [Itemlog],
  // // dateStrings: true,
  // // migrations: ['src/migrations/*{.ts,.js}'],
  // synchronize: false,
  // timezone: "Z", //  
  //   }),
  //   TypeOrmModule.forFeature([ Itemlog ]),
  // ],
  imports: [TypeOrmModule.forFeature([ Itemlog ])],

  controllers: [ItemlogController],
  providers: [ItemlogService],
})
export class ItemlogModule {}
