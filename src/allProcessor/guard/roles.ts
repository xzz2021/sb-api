import { SetMetadata } from "@nestjs/common";
import { RoleArr } from "./roles.enum";



export const ROLES_KEY = 'roles';
export const RolesGuard = (...roles: RoleArr[]) => SetMetadata(ROLES_KEY, roles);