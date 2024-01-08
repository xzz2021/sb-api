import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Between, DataSource, MoreThanOrEqual } from 'typeorm';
import { Itemlog } from './entities/itemlog.entity';
import { Moneylog } from './entities/moneylog.entity';
import { Onlineplayer } from './entities/onlineplayer.entity';

@Injectable()
export class GamelogService {
  constructor(
    @InjectDataSource('gamelog')
    private dataSource: DataSource,
    // @InjectRepository(Itemlog) private readonly itemlogRepository:  //  调用数据库必须进行注入
    // Repository<Itemlog>,
  ){}

  async findItem(pageSize,pageIndex, searchParam){
    const keyArr = Object.keys(searchParam)
    if(keyArr.length == 0){
      return await this.findAllItem(pageSize,pageIndex);
    }else {
      //  构造查询条件
      let buildWhereCondition = {}
      // 判断是否有时间区间查询 条件 
      if(searchParam.LogTime){
        const dateSpan = searchParam.LogTime.split(',')
        const from = dateSpan[0]
        const to = dateSpan[1]
  buildWhereCondition = {LogTime: Between(from, to)}
        //  移除日期键
        const omit = (obj, keys) =>  Object.keys(obj).filter((k) => !keys.includes(k)).reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {})
        searchParam = omit(searchParam,['LogTime'])
  }
  const newKeyArr = Object.keys(searchParam)
    if(newKeyArr.length > 0){
      Object.keys(searchParam).forEach(function (key) {
        buildWhereCondition = {...{[key]:searchParam[key]}, ...buildWhereCondition}
      });
    }
    const itemLogRepository = await this.dataSource.getRepository(Itemlog);
    const list =   await itemLogRepository.find({where:buildWhereCondition,take: pageSize, skip: (pageIndex -1)*pageSize })
    const total =  await itemLogRepository.count({where:buildWhereCondition})
    // const total =  await itemLogRepository.countBy(buildWhereCondition)   // 也可行

    // const sum = await repository.sum("age", { firstName: "Timber" })  //   返回符合 FindOptionsWhere 的所有实体的某一数字字段的总和
    //  average - 返回符合 FindOptionsWhere 的所有实体的某一数字字段的平均值
    //   minimum   maximum  - 返回符合 FindOptionsWhere 的所有实体的某一数字字段的最小值
    //  query - 执行原始的 SQL 查询
    //   const rawData = await repository.query(`SELECT * FROM USERS`)

    return {
      list,
      total
    }
    }

  }

  async findAllItem(pageSize,currentPage) {
    const itemLogRepository = await this.dataSource.getRepository(Itemlog);
    // const [timbers, timbersCount] = await manager.findAndCount(User, { firstName: "Timber" });
    const list =   await itemLogRepository.find({take: pageSize, skip: (currentPage -1)*pageSize });
    const total =  await itemLogRepository.count();
    return {
      list,
      total
    }
  }

  async findMoney(pageSize,pageIndex, searchParam){
    // console.log('🚀 ~ file: itemlog.service.ts:36 ~ ItemlogService ~ findByCondition ~ searchParam:', searchParam)
    const keyArr = Object.keys(searchParam)
    if(keyArr.length == 0){
      return await this.findAllMoney(pageSize,pageIndex);
    }else {
      //  构造查询条件
      let buildWhereCondition = {}
      // 判断是否有时间区间查询 条件 
      if(searchParam.LogTime){
        const dateSpan = searchParam.LogTime.split(',')
        const from = dateSpan[0]
        const to = dateSpan[1]
  buildWhereCondition = {LogTime: Between(from, to)}
        //  移除日期键
        const omit = (obj, keys) =>  Object.keys(obj).filter((k) => !keys.includes(k)).reduce((res, k) => Object.assign(res, { [k]: obj[k] }), {})
        searchParam = omit(searchParam,['LogTime'])
  }
  const newKeyArr = Object.keys(searchParam)
    if(newKeyArr.length > 0){
      Object.keys(searchParam).forEach(function (key) {
        buildWhereCondition = {...{[key]:searchParam[key]}, ...buildWhereCondition}
      });
    }
    const itemLogRepository = await this.dataSource.getRepository(Moneylog);
    const list =   await itemLogRepository.find({where:buildWhereCondition,take: pageSize, skip: (pageIndex -1)*pageSize })
    const total =  await itemLogRepository.count(buildWhereCondition);

    return {
      list,
      total
    }
    }

  }

  async findAllMoney(pageSize,currentPage) {
    const itemLogRepository = await this.dataSource.getRepository(Moneylog);
    const list =   await itemLogRepository.find({take: pageSize, skip: (currentPage -1)*pageSize });
    const total =  await itemLogRepository.count();
    return {
      list,
      total
    }
  }

  async findAllOnlineplayer() {
    return 'ooo'
    // const unixTime = Math.floor((Date.now() - 24 * 60 * 60 * 1000) / 1000)
    const unixTime = Date.parse(new Date()+'') / 1000 - 28 * 60 * 60
        let base = unixTime
    const fiveMinutes = 300
    const data = [{SaveTime: base, OnlieRoleCount: Math.floor(Math.random() * 100)}]
    for (let i = 0; i < 335; i++) {
      const now = new Date((base += fiveMinutes))
      data.push({SaveTime: +now, OnlieRoleCount: Math.floor(Math.random() * 100)})
    }
    const onlineplayerRepository = await this.dataSource.getRepository(Onlineplayer);
    
    // const res2 = await onlineplayerRepository.find()
    // return res2
    const res = await onlineplayerRepository.insert(data)
        return res
    
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
