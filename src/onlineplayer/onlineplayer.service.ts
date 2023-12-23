import { Injectable } from '@nestjs/common';
import { CreateOnlineplayerDto } from './dto/create-onlineplayer.dto';
import { UpdateOnlineplayerDto } from './dto/update-onlineplayer.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Onlineplayer } from './entities/onlineplayer.entity';

@Injectable()
export class OnlineplayerService {

  // constructor(
  //   @InjectRepository(LogdataOnlierolecount) private readonly onlineplayerRepository:  //  调用数据库必须进行注入
  //   Repository<LogdataOnlierolecount>,
  // ){}
  constructor(
  @InjectDataSource('gamelog2')
  private dataSource: DataSource,
  // @InjectRepository(Itemlog) private readonly itemlogRepository:  //  调用数据库必须进行注入
  // Repository<Itemlog>,
){}
  create(createOnlineplayerDto: CreateOnlineplayerDto) {
    return 'This action adds a new onlineplayer';
  }

  async findAll() {
return 'ooo'
// const unixTime = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000)
// const unixTime = 1703306946 - 28 * 60 * 60
//     let base = unixTime
// const fiveMinutes = 300
// const data = [{SaveTime: base, OnlieRoleCount: Math.floor(Math.random() * 100)}]
// for (let i = 0; i < 335; i++) {
//   const now = new Date((base += fiveMinutes))
//   data.push({SaveTime: +now, OnlieRoleCount: Math.floor(Math.random() * 100)})
// }
// const onlineplayerRepository = await this.dataSource.getRepository(Onlineplayer);

// // const res2 = await onlineplayerRepository.find()
// // return res2
// const res = await onlineplayerRepository.insert(data)
//     return res

  }
  async find12Hour() {


    try {
    const onlineplayerRepository = await this.dataSource.getRepository(Onlineplayer)
    const current: Date = new Date()
    const curUnixTime = Date.parse('' + current) / 1000 - 12 * 60 * 60
        const res = await onlineplayerRepository.findBy({SaveTime: MoreThanOrEqual(curUnixTime)})
        return res
      
    } catch (error) {
      
    }

        // const onlineplayerRepository = await this.dataSource.getRepository(Onlineplayer)
    // const curUnixTime = Math.floor((Date.now() - 12 * 60 * 60 * 1000) / 1000)
    //     const res = await onlineplayerRepository.findBy({SaveTime: MoreThanOrEqual(curUnixTime)})
        
    //     // console.log('🚀 ~ file: onlineplayer.service.ts:47 ~ OnlineplayerService ~ find12Hour ~ res:', res)
    //     return res


    // const onlineplayerRepository = await this.dataSource.getRepository(Onlineplayer)
    // const curUnixTime = new Date((+new Date() - 12 * 60 * 60 * 1000)).valueOf()
    //     const res = await onlineplayerRepository.findBy({SaveTime: MoreThanOrEqual(curUnixTime)})
        
    //     console.log('🚀 ~ file: onlineplayer.service.ts:47 ~ OnlineplayerService ~ find12Hour ~ res:', res)
    //     return res
  }


  
    async specifyDate(unixtime: number){
      const start = unixtime
      const  end = +unixtime + 24 * 60 * 60
      try {
        const onlineplayerRepository = await this.dataSource.getRepository(Onlineplayer)
            const res = await onlineplayerRepository.find({where: {SaveTime: Between(start, end)}})
            // console.log('🚀 ~ file: onlineplayer.service.ts:82 ~ OnlineplayerService ~ specifyDate ~ res:', res)
            // 如果 没有数据 会 返回 空数组
            return res
          
        } catch (error) {
          
        }

    }




}
