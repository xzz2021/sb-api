import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Users } from './userinfo/entities/userinfo.entity';
import { ConfigService } from '@nestjs/config'
import { allEntities } from 'ormconfig';
var fs = require("fs");
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!this is nest test!';
  }

  addConfig(config){
    return new ConfigService(config)
  }
  async testCreate(body){
    //   这里 也可以  直接  使用  url 方式连接   有url之后 会 忽略  所有 其他参数
    // const AppDataSource = new DataSource({url: body.url})
    const { type, host, port, username, password, database } = body
    this.addConfig({type, host, port, username, password, database})
    const AppDataSource = new DataSource({
      type,
      host,
      port,
      username,
      password,
      entities: allEntities,
    // autoLoadEntities: true,
      database
  } as DataSourceOptions)
  try {
    
    await AppDataSource.initialize()
    // const ii = AppDataSource.entityMetadatas
    // console.log('🚀 ~ file: app.service.ts:32 ~ AppService ~ testCreate ~ ii:', ii)

      const usersRepository =  AppDataSource.getRepository(Users)
  const allUsers = await usersRepository.find()

    // ① 原始查询 整个已连接的database
    //  只能执行原始查询  因为没有动态导入nest模块
    // const rawData = await AppDataSource.query(`SELECT * FROM shengbai.users;`)
    //   console.log('🚀 ~ file: app.service.ts:30 ~ AppService ~ awaitAppDataSource.initialize ~ rawData:', rawData)


// const users = await AppDataSource.manager.findOneBy(Users, {id: 1})  //  XXXXX   无效
//   console.log('🚀 ~ file: app.service.ts:34 ~ AppService ~ testCreate ~ users:', users)

// const users = await AppDataSource
//     .createQueryBuilder()
//     .select()
//     .from(Users, "user")
//     .where("user.id = :id", { id: 2 })
//     .getOne()
//   console.log('🚀 ~ file: app.service.ts:40 ~ AppService ~ testCreate ~ users:', users)

  // const queryRunner = AppDataSource.createQueryRunner()
  // await queryRunner.connect()

  // await queryRunner.release()

  //   .then(async () => {
  //     console.log('🚀 ~ file: app.service.==============~ testCreate ~ repository:')
  //     const rawData = await AppDataSource.query(`SELECT * FROM shengbai.users;`)
  //     console.log('🚀 ~ file: app.service.ts:30 ~ AppService ~ awaitAppDataSource.initialize ~ rawData:', rawData)
  //     return ''
  //     const repository = await AppDataSource.getRepository(Users)
  //     console.log('🚀 ~ file: app.service.ts:34 ~ AppService ~ testCreate ~ repository:', repository)

  // // now you can call repository methods, for example find:
  // const users = await repository.find()
  // console.log('🚀 ~ file: app.service.ts:36 ~ AppService ~ testCreate ~ users:', users)
  // return '00'
  //   })
    //  const user = await AppDataSource.manage.find(User)

    // const user = await AppDataSource.transaction(
    //   async () => {}
    // )

  } catch (error) {
    console.log('🚀 ~ file: app.service.ts:26 ~ AppService ~ testCreate ~ error:', error)
    return error.sqlMessage
    
  } finally{
    await AppDataSource.destroy()
    console.log('🚀 ~ file: app.service.ts:66 ~ AppService ~ testCreate ~ destroy:')
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
  
  async findUsers(AppDataSource){
    try {
      
      const userRepository = await AppDataSource.manager.find('Users')
      console.log('🚀 ~ file: app.service.ts:61 ~ AppService ~ findUsers ~ userRepository:', userRepository)
      // const res = await userRepository.manager.find(Users)
      // console.log('🚀 ~ file: app.service.ts:63 ~ AppService ~ findUsers ~ res:', res)
      return 'user'
    } catch (error) {
      console.log('🚀 ~ file: app.service.ts:64 ~ AppService ~ findUsers ~ error:', error)
      
    }

  }

   async testCreate2(body){
    const { type, host, port, username, password, database } = body

    const TEXT = `
      TYPE="${type}"
      HOST="${host}"
      PORT=${port}
      DBUSER="${username}"
      PWD="${password}"
      DB="${database}"
    `

    fs.writeFile("./.env", TEXT, (err, data) => {
      if (err) throw err;
  });
  //  如果连接错误  需要还原数据   方案 不行
   }
}
