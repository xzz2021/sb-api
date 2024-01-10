import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatToTree } from 'src/allProcessor/fn/xzzfn';
import { Repository } from 'typeorm';

@Injectable()
export class LogService {



  async getAllLog(){

  }



  async addLog(newLog) {
  console.log('🚀 ~ LogService ~ addLog ~ newLog:', newLog)

}

}
