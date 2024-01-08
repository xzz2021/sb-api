import { PartialType } from '@nestjs/swagger';
import { CreateGamelogDto } from './create-gamelog.dto';

export class UpdateGamelogDto extends PartialType(CreateGamelogDto) {}
