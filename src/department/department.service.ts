import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departments } from './entities/department.entity';
import { In, Repository } from 'typeorm';
import { Users } from 'src/userinfo/entities/userinfo.entity';

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
    let newRes = []
    if (res.length > 0) {
       newRes = res.map((item) => {
        item.createTime = this.rTime(item.createTime)
        return item
      })
    } else {
      return []
    }
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
    const newData = formatToTree(newRes, undefined)
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


  //  根据  条件  查询  获取  符合  的  用户
  async findByDepartment(joinQueryParams, role){
    let  {  id, pageIndex, pageSize } = joinQueryParams

    if(role.roleName === '超级管理员'){  
      // 如果是管理员 直接返回  所有用户  作为初始化 管理使用
      const list = await this.userinfoRepository.find()
    return { list, total: list.length }
    }
    if( id == 1){  
      // 如果是管理员 直接返回  所有用户  作为初始化 管理使用
      const res = await this.userinfoRepository.find()
    return { list: res.slice(1), total: res.length - 1 } 
    }
    if(!id) return { list: [], total: 0 }
    const res = await this.departmentsRepository.findOne({where: { id }, relations: ['departmentUsersArr']})
    return { list: res.departmentUsersArr || [], total: res.departmentUsersArr ? res.departmentUsersArr.length: 0}
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
