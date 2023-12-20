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
  async joinQuery(joinQueryParams){
    const enumName = joinQueryParams.enumName
    const res = await this.enumitemRepository.findOne({where: { enumName }})
    if (res) {
    res.itemJson = JSON.parse(res.itemJson)
    return res
    } else {
      return null
    }
  }


  async updateEnumitem (createEnumitemDto: CreateEnumitemDto){
    const curItem = await this.enumitemRepository.findOne({where: {enumName: createEnumitemDto.enumName } })
    if(curItem == null) {
      const newItem = new Enumitem()
      newItem.enumName = createEnumitemDto.enumName
      newItem.itemJson = createEnumitemDto.itemJson
      const res = await this.enumitemRepository.save(newItem)
      return {id: res.id }
    }
    curItem.itemJson = createEnumitemDto.itemJson
    const res = await this.enumitemRepository.save(curItem)
    return {id: res.id }
  }
}
