import { IsString } from 'class-validator';

export class CreatePartnerDto {
  @IsString()
  name: string;

  @IsString()
  contact_info: string;
}

export class UpdatePartnerDto {
  @IsString()
  name?: string;

  @IsString()
  contact_info?: string;
}