import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!this is nest test!';
  }


  async testCreate(body){
    console.log('🚀 ~ file: app.service.ts:12 ~ AppService ~ testCreate ~ body:', body)
    const { type, host, port, username, password, database } = body
    const AppDataSource = new DataSource({
      type,
      host,
      port,
      username,
      password,
      database
  })
  try {
    
    await AppDataSource.initialize()
    
  } catch (error) {
    // console.log('🚀 ~ file: app.service.ts:26 ~ AppService ~ testCreate ~ error:', error)
    return error.sqlMessage
    
  }
      // .then(async () => {
      //     console.log("数据源已初始化！")
      //     const rawData = await AppDataSource.query(`show tables`)
      //     console.log('🚀 ~ file: app.service.ts:28 ~ AppService ~ .then ~ rawData:', rawData)
      //     return rawData
      // })
      // .catch((err) => {
      //     console.error("数据源初始化时出错", err)
      // })

      // const  res = await AppDataSource.manager.find('logdata_onlierolecount')
      // return res
      // const manager = AppDataSource.manager
          //     const rawData = await AppDataSource.query(`show tables`)
          // console.log('🚀 ~ file: app.service.ts:28 ~ AppService ~ .then ~ rawData:', rawData)
          // return rawData
  }
}
