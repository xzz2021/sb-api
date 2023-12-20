import { PartialType } from '@nestjs/swagger';
import { CreateEnumitemDto } from './create-enumitem.dto';

export class UpdateEnumitemDto extends PartialType(CreateEnumitemDto) {}
