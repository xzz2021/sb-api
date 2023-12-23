import { PartialType } from '@nestjs/swagger';
import { CreateOnlineplayerDto } from './create-onlineplayer.dto';

export class UpdateOnlineplayerDto extends PartialType(CreateOnlineplayerDto) {}
