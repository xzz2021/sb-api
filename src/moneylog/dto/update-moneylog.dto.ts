import { PartialType } from '@nestjs/swagger';
import { CreateMoneylogDto } from './create-moneylog.dto';

export class UpdateMoneylogDto extends PartialType(CreateMoneylogDto) {}
