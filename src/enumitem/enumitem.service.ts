import { Injectable } from '@nestjs/common';
import { CreateEnumitemDto } from './dto/create-enumitem.dto';
import { UpdateEnumitemDto } from './dto/update-enumitem.dto';
import { Enumitem } from './entities/enumitem.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EnumitemService {

  constructor(
    @InjectRepository(Enumitem) private readonly enumitemRepository:  //  调用数据库必须进行注入
    Repository<Enumitem>,
    // private readonly userinfoService: UserinfoService,
  ){}
  create(createEnumitemDto: CreateEnumitemDto) {
    return 'This action adds a new enumitem';
  }

  // 根据条件 查询 到 对应的 枚举项目   
  async getSingleData(curItem: string){
    const res = await this.enumitemRepository.findOne({where: { enumName: curItem }})
    if (res) {
    res.itemJson = JSON.parse(res.itemJson)
    return res
    } else {
      return null
    }
  }

  async joinQuery(joinQueryParams: string[]){
    let resData = []
    for (let i = 0; i < joinQueryParams.length; i++) {
      const curItem = joinQueryParams[i]
      const res = await this.getSingleData(curItem)
      if (res) {
        resData.push(res)
      }
    }
    return resData
  }


//   async updateEnumitem (createEnumitemDto: updateEnumitem[]){
//     //  传递过来的  是一个  批量数据组成的数组
//     const curItem = await this.enumitemRepository.findOne({where: {enumName: createEnumitemDto.enumName } })
//     if(curItem == null) {
//       const newItem = new Enumitem()
//       newItem.enumName = createEnumitemDto.enumName
//       newItem.itemJson = createEnumitemDto.itemJson
//       const res = await this.enumitemRepository.save(newItem)
//       return {id: res.id }
//     }
//     curItem.itemJson = createEnumitemDto.itemJson
//     const res = await this.enumitemRepository.save(curItem)
//     return {id: res.id }
//   }
// }
    async updateEachItem (data: updateEnumitem) {
      const curItem = await this.enumitemRepository.findOne({where: {enumName: data.sheetName } })
      if(curItem == null) {
        const newItem = new Enumitem()
        newItem.enumName = data.sheetName
        newItem.itemJson = JSON.stringify(data.sheetData) 
        const res = await this.enumitemRepository.save(newItem)
        return {id: res.id }
      }
      curItem.itemJson = JSON.stringify(data.sheetData) 
      const res = await this.enumitemRepository.save(curItem)
      return {id: res.id }
    }

async updateEnumitem (updateEnumite: updateEnumitem[]){
  //  传递过来的  是一个  批量数据组成的数组
  const ids = []
  for(let i=0; i< updateEnumite.length; i++){
    const updatedId = await this.updateEachItem(updateEnumite[i])
    ids.push(updatedId)
  }
  return ids
}
}
