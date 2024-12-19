import { IsString, IsNumber } from 'class-validator';
import { MotoStatus } from '../../../../../domain/entities/moto.entity';

export class CreateMotoDto {
  @IsString()
  model: string;

  @IsString()
  clientId: string;

  @IsNumber()
  currentMileage: number;

  @IsNumber()
  price: number;

  @IsString()
  color: string;

  @IsString()
  status: MotoStatus;
}