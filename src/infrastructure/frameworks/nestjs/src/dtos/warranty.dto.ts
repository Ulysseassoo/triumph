import { IsString } from 'class-validator';


export class CreateWarrantyDto {
  @IsString()
  motoId: string;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;
}