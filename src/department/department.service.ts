import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/userinfo/entities/userinfo.entity';
import { In, Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Departments } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Departments) private readonly departmentsRepository:  //  调用数据库必须进行注入
    Repository<Departments>,
    @InjectRepository(Users) private readonly userinfoRepository:  //  调用数据库必须进行注入
        Repository<Users>,
  ){}

   rTime(date) {  // 转换日期 时间 格式
    // var json_date = new Date(date).toJSON();
    return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
}
  // 获取所有部门
  async getDepartmentTable(){
    const res = await this.departmentsRepository.find()
    // 需要嵌套
    const formatToTree = (ary: any[], pid: number | undefined) => {
      return ary
        .filter((item) =>
          // 如果没有父id（第一次递归的时候）将所有父级查询出来
          // 这里认为 item.parentId === 1 就是最顶层 需要根据业务调整
          pid === undefined ? item.parentId === null : item.parentId === pid
        )
        .map((item) => {
          // 通过父节点ID查询所有子节点
          item.children = formatToTree(ary, item.id)
          return item
        })
    }
    // return newRes
    const newData = formatToTree(res, undefined)
    return  newData
  }
  
  // 此接口可以同时用作新增及修改
  async add(createDepartmentDto: CreateDepartmentDto) {
    // createDepartmentDto.parentId === null && (createDepartmentDto.parentId = '1000')
    const departmentSave:any = this.departmentsRepository.create(createDepartmentDto)
    const res = await this.departmentsRepository.save(departmentSave)
    return res
  }

  //  删除部门
  async removeDepartment(id: number){
    const res = await this.departmentsRepository.delete(id)
    //  删除操作返回数据 { 'raw': [], 'affected': 1 | 0 }
    return res
  }

  //  批量删除部门
  async batchRemoveDepartment(list: any[]){
    //  delete 默认以自增id作为参数进行删除操作
    // 指定被删除的列名
    const res = await this.departmentsRepository.delete({ id: In(list) })
    return res
  }


async findAllUser(id) {
  console.log('🚀 ~ file: department.service.ts:68 ~ DepartmentService ~ findAllUser ~ id:', id)
  // const [list, total] =   await this.rolesRepository.findAndCount(condition);
      //  先获取 部门 所属 的用户
      const res = await this.departmentsRepository.findOne({where: { id }, relations: ['departmentUsersArr']})
      const departmentUsersArr = res.departmentUsersArr
      const newList =  await Promise.all( departmentUsersArr.map(async (item: Users)=> {
        const  newItem = await this.userinfoRepository
        .createQueryBuilder('users')
        .where("users.id = :id", { id: item.id })
        .select([ 'users', 'department', 'role'])   //   关联 查询   并返回关联查询 的指定字段
        .leftJoin('users.role', "role")                
        .leftJoin('users.department', "department")                
        .getOne()
        return newItem
      }))
      return newList
}
  //  根据  条件  查询  获取  符合  的  用户
  async findByDepartment(pageSize,pageIndex, id){
// return 'oo'
    // if(roleName === '超级管理员'){  
    //   // 如果是管理员 直接返回  所有用户  作为初始化 管理使用
    //   // const list = await this.userinfoRepository.find()
    //   const list = await this.userinfoRepository
    //   .createQueryBuilder('users')
    //   .select(['users', 'department', 'role.id', 'role.roleName'])   //   关联 查询   并返回关联查询 的指定字段
    //   .leftJoin('users.role', "role")                                 //  关联 查询   一定 要加  leftjoin
    //   .leftJoin('users.department', "department")
    //   .getMany()
    // return { list, total: list.length }
    // }
    const exitId = id || 1
    if( exitId == 1 ){  
      // 如果部门id是1 直接返回 除管理员之外的 所有用户  作为初始化 管理使用
      const res = await this.userinfoRepository
      .createQueryBuilder('users')
      .select(['users', 'department', 'role'])   //   关联 查询   并返回关联查询 的指定字段
      .leftJoin('users.role', "role")                                 //  关联 查询   一定 要加  leftjoin
      .leftJoin('users.department', "department")
      .getMany()
      const rawList = res.slice(1)
    const newList = rawList.slice((pageIndex -1)*pageSize, pageIndex*pageSize)
    return { list: newList, total: rawList.length} 
    }
    //  暂时 只 根据部门查询 用户
    const rawList = await this.findAllUser(exitId)
    const total = rawList.length
    const newList = rawList.slice((pageIndex -1)*pageSize, pageIndex*pageSize)
    return { list: newList, total }

    // const keyArr = Object.keys(otherParams)
    // let condition = {take: pageSize, skip: (pageIndex -1)*pageSize, relations: ['menusArr', 'metaPermission'] }
    // if(keyArr.length == 0){
    //   return await this.findAllItem(condition)
    // }else {
    //   //  构造查询条件
    //   let buildWhereCondition = {}
    //   Object.keys(searchParam).forEach(function (key) {
    //     buildWhereCondition = {...{[key]:ILike(`%${searchParam[key]}%`)}, ...buildWhereCondition}
    //   })
    //   condition.where = {...condition.where, ...buildWhereCondition}
    //   return await this.findAllItem(condition) 
    // }


  }

  async findDepartmentById(id: number){
    const res = await this.departmentsRepository.findOne({where: {id}})
    return res
  }

  async tempadd(){
        // 模拟修改
        // const addUser = await this.userinfoRepository.findOne({where: {id: 3}})
        // if(addUser){
        //   const top = await this.departmentsRepository.findOne({where: {id: 1}})
        //   // top.usersArr = addUser
        //   const res = await this.departmentsRepository.save(top)
        //   return res
        // }
  }
}
