import { User } from '../../domain/entities/user.entity';
import { Partner } from './../../domain/entities/partner.entity';

export interface PartnerRepositoryInterface {
  create(partner: Partner): Promise<Partner>;
  findById(id: string): Promise<Partner | null>;
  findAll(): Promise<Partner[]>;
  update(id: string, partnerData: Partial<Partner>): Promise<void>;
  delete(id: string): Promise<void>;
  findUsersByPartnerId(partnerId: string): Promise<User[]>;
}