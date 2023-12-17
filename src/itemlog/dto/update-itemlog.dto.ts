import { PartialType } from '@nestjs/swagger';
import { CreateItemlogDto } from './create-itemlog.dto';

export class UpdateItemlogDto extends PartialType(CreateItemlogDto) {}
