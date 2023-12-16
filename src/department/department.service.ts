import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departments } from './entities/department.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Departments) private readonly departmentsRepository:  //  调用数据库必须进行注入
    Repository<Departments>,
  ){}

  // 获取所有部门
  async getList(){
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

  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  findAll() {
    return `This action returns all department`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
