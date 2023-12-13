import { PartialType } from '@nestjs/swagger';
import { CreatePermissionListDto } from './create-permission-list.dto';

export class UpdatePermissionListDto extends PartialType(CreatePermissionListDto) {}
