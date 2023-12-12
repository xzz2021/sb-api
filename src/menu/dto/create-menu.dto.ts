import { Metas } from "../entities/meta.entity"

export class CreateMenuDto {
    menuId: number
    id: string
    parentId?: string
    name: string
    path: string
    component: string
    redirect: string
    status: number 
    type: string
    meta: Metas
    permissionList?: any[]  
}
