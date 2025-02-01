import { Injectable } from '@nestjs/common';
import { PartnerRepositoryInterface } from "../../../../../application/repositories/PartnerRepositoryInterface";
import { User } from '../../../../../domain/entities/user.entity';

@Injectable()
export class PartnerRepository implements PartnerRepositoryInterface {
  constructor(
  ) {}
  findUsersByPartnerId(partnerId: string): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
