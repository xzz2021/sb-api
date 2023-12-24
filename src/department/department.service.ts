import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
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

  // 获取所有部门
  async getDepartmentTable(){
    const res = await this.departmentsRepository.find();
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
    const newData = formatToTree(res, undefined)
    // console.log('🚀 ~ file: role.service.ts:52 ~ RoleService ~ findAllRoles ~ res:', res)
    return  newData
  }
  
  // 此接口可以同时用作新增及修改
  async add(createDepartmentDto: CreateDepartmentDto) {
    // createDepartmentDto.parentId === null && (createDepartmentDto.parentId = '1000')
    const departmentSave:any = this.departmentsRepository.create(createDepartmentDto)
    const res = await this.departmentsRepository.save(departmentSave)
    // console.log('🚀 ~ file: role.service.ts:59 ~ RoleService ~ addRole ~ res:', res)
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
    console.log('🚀 ~ file: department.service.ts:39 ~ DepartmentService ~ batchRemoveDepartment ~ list:', list)
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
      const res = await this.userinfoRepository.find()
    return res
    }
    if( id == 1){  
      // 如果是管理员 直接返回  所有用户  作为初始化 管理使用
      const res = await this.userinfoRepository.find()
    return res.slice(1)
    }
    if(!id) return []
    const res = await this.departmentsRepository.findOne({where: { id }, relations: ['departmentUsersArr']})
    return res.departmentUsersArr
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
