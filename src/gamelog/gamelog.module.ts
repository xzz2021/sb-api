import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { Itemlog } from './entities/itemlog.entity';
import { GamelogController } from './gamelog.controller';
import { GamelogService } from './gamelog.service';
import { Moneylog } from './entities/moneylog.entity';
import { Onlineplayer } from './entities/onlineplayer.entity';

const  db2  = config.get('db2')

@Module({
  imports: [TypeOrmModule.forRootAsync({
    name: 'gamelog',
    useFactory: () =>({
      name: 'gamelog',
      type: 'mysql',
      host: db2.host,
      port: db2.post,
      username: db2.user,
      password: db2.pwd,
      database: 'pc_202309171442',
      // entities: [Itemlog, Moneylog, Onlineplayer],
      entities: [Itemlog, Moneylog, Onlineplayer],
      //此处定义为是否同步代码,,,,,,生产模式需关闭,  引入迁移模式
      // 千万慎重开启，
      synchronize: false,  
      timezone: "Z", //  
      // logging: ['error'], 
      retryAttempts: 5  //  重试连接数据库的次数（默认：10）
      
    } as TypeOrmModuleOptions ),
  }
  )],
  controllers: [GamelogController],
  providers: [GamelogService],
})
export class GamelogModule {}
