import { Injectable } from '@nestjs/common';
import { CreateItemlogDto } from './dto/create-itemlog.dto';
import { UpdateItemlogDto } from './dto/update-itemlog.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Itemlog } from './entities/itemlog.entity';
import { DataSource, Repository } from 'typeorm';
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

  async findAll() {

    const itemLogRepository = await this.dataSource.getRepository(Itemlog);
    const res =   await itemLogRepository.find();
    // console.log('🚀 ~ file: itemlog.service.ts:26 ~ ItemlogService ~ findAll ~ res:', res)
    return  res
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
