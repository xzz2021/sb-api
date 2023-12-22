import { Injectable } from '@nestjs/common';
import { CreateItemlogDto } from './dto/create-itemlog.dto';
import { UpdateItemlogDto } from './dto/update-itemlog.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Itemlog } from './entities/itemlog.entity';
import { Between, DataSource, Repository } from 'typeorm';
// import { format } from 'winston';
import { format } from 'date-fns';
// import {DataSource2} from '../orm/ormconfig.module';

@Injectable()
export class ItemlogService {

  constructor(
    @InjectDataSource('gamelog')
    private dataSource: DataSource,
    // @InjectRepository(Itemlog) private readonly itemlogRepository:  //  调用数据库必须进行注入
    // Repository<Itemlog>,
  ){}
  create(createItemlogDto: CreateItemlogDto) {
    return 'This action adds a new itemlog';
  }

  async findAll(pageSize,currentPage) {

    const itemLogRepository = await this.dataSource.getRepository(Itemlog);
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
  console.log('🚀 ~ file: itemlog.service.ts:55 ~ ItemlogService ~ buildWhereCondition:', buildWhereCondition)
    const itemLogRepository = await this.dataSource.getRepository(Itemlog);
    const list =   await itemLogRepository.find({where:buildWhereCondition,take: pageSize, skip: (pageIndex -1)*pageSize })
    const total =  await itemLogRepository.count(buildWhereCondition);

    return {
      list,
      total
    }
    }

  }

  findOne(id: number) {
    return `This action returns a #${id} itemlog`;
  }

  update(id: number, updateItemlogDto: UpdateItemlogDto) {
    return `This action updates a #${id} itemlog`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemlog`;
  }
}
