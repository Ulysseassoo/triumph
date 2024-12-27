import { IsString, IsNumber, IsObject } from 'class-validator';

export class CreateOrderDto {

  @IsObject()
  pieces: object;

  @IsString()
  orderDate: string;

  @IsString()
  deliveryDate: string;

  @IsString()
  status: string;

  @IsNumber()
  totalAmount: number;
  
  @IsObject()
  previousQuantity: object;

}
