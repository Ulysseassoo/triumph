
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePieceDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  alertLimit: number;
}

export class UpdatePieceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsNumber()
  alertLimit?: number;
}

export class DeletePieceDto {
  @IsString()
  id: string; 
}
