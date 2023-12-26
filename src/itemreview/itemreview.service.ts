import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, IsNull, Not, Repository } from 'typeorm';
import { Itemreview } from './entities/itemreview.entity';

@Injectable()
export class ItemreviewService {
    constructor(
     @InjectRepository(Itemreview) private readonly itemreviewRepository:  //  调用数据库必须进行注入
  Repository<Itemreview>
    ){}


    async addApply(addItem){

        const newItem = await this.itemreviewRepository.insert(addItem);
        return newItem
    }


    async updateApply(updateItem){
        const newItem = await this.itemreviewRepository.save(updateItem);
        return newItem
    }

    async getAllItems(joinQueryParams){
        const {reviewStatus} = joinQueryParams
        if(reviewStatus == 'all') {
            const allItems = await this.itemreviewRepository.findBy({reviewStatus: Not(IsNull())})
            return allItems
        }else{
            const allItems = await this.itemreviewRepository.findBy({reviewStatus: IsNull()})
            return allItems
        }
    }
}
