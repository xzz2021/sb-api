import { Metas } from "../entities/meta.entity"

export class CreateMenuDto {
    parentId: number
    name: string
    path: string
    component: string
    redirect: string
    status: number 
    meta?: Metas
    permissionList?: any[]  
}
