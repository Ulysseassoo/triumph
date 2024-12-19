import { IsString, IsNumber } from 'class-validator';

export class CreateMaintenanceDto {
  @IsString()
  motoId: string;

  @IsNumber()
  kilometrageInterval: number;

  @IsNumber()
  tempsInterval: number;

  @IsString()
  recommandations: string;
}