import { User } from '../../domain/entities/User';

export interface PartnerRepositoryInterface {
  findUsersByPartnerId(partnerId: string): Promise<User[]>;
}