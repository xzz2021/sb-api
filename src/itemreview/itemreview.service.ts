import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
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

        const newItem = await this.itemreviewRepository.insert(updateItem);
        return newItem
    }

    async getAllItems(joinQueryParams){
        const {reviewStatus} = joinQueryParams
        if(reviewStatus == 'all') {
            const allItems = await this.itemreviewRepository.findBy({reviewStatus: Not(null)})
            return allItems
        }else{
            const allItems = await this.itemreviewRepository.findBy({reviewStatus: null})
            return allItems
        }
    }
}
