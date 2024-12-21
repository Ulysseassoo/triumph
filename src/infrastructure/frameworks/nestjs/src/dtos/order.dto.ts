import { IsString, IsNumber, IsObject } from 'class-validator';

export class CreateOrderDto {

  @IsObject()
  pieces: string;

  @IsString()
  orderDate: string;

  @IsString()
  deliveryDate: string;

  @IsString()
  status: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  totalAmount: number;

}
