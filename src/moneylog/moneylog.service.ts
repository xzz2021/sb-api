import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Between, DataSource } from 'typeorm';
import { Moneylog } from './entities/moneylog.entity';

@Injectable()
export class MoneylogService {

  constructor(
    @InjectDataSource('gamelog')
    private dataSource: DataSource,
  ){}



  async findAll(pageSize,currentPage) {

    const itemLogRepository = await this.dataSource.getRepository(Moneylog);
    const list =   await itemLogRepository.find({take: pageSize, skip: (currentPage -1)*pageSize });
    const total =  await itemLogRepository.count();
    return {
      list,
      total
    }
  }

  async findByCondition(pageSize,pageIndex, searchParam){
    // console.log('🚀 ~ file: itemlog.service.ts:36 ~ ItemlogService ~ findByCondition ~ searchParam:', searchParam)
    const keyArr = Object.keys(searchParam)
    if(keyArr.length == 0){
      return await this.findAll(pageSize,pageIndex);
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

}
