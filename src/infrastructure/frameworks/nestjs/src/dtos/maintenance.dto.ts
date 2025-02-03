import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsDate, IsOptional } from 'class-validator';
import { Piece } from '../../../../../domain/entities/piece.entity';

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

export class UpdateMaintenanceDto {
  @IsString()
  recommandations: string;

  @IsNumber()
  kilometrageInterval: number;

  @IsNumber()
  tempsInterval: number;
}

export class AchieveMaintenanceDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  achievedDate?: Date;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsArray()
  pieces?: Piece[];

  @IsOptional()
  @IsString()
  recommandations?: string;
}