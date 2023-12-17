import { Injectable } from '@nestjs/common';
import { CreateMoneylogDto } from './dto/create-moneylog.dto';
import { UpdateMoneylogDto } from './dto/update-moneylog.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Moneylog } from './entities/moneylog.entity';

@Injectable()
export class MoneylogService {

  constructor(
    @InjectDataSource('gamelog')
    private dataSource: DataSource,
    // @InjectRepository(Itemlog) private readonly itemlogRepository:  //  调用数据库必须进行注入
    // Repository<Itemlog>,
  ){}
  create(createMoneylogDto: CreateMoneylogDto) {
    return 'This action adds a new moneylog';
  }

  async findAll() {
    const moneyLogRepository = this.dataSource.getRepository(Moneylog);
    const res =   await moneyLogRepository.find();
    // console.log('🚀 ~ file: itemlog.service.ts:26 ~ ItemlogService ~ findAll ~ res:', res)
    return  res
  }

  findOne(id: number) {
    return `This action returns a #${id} moneylog`;
  }

  update(id: number, updateMoneylogDto: UpdateMoneylogDto) {
    return `This action updates a #${id} moneylog`;
  }

  remove(id: number) {
    return `This action removes a #${id} moneylog`;
  }
}
