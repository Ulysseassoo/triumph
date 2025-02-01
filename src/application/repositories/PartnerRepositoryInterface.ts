import { User } from "../../domain/entities/user.entity";

export interface PartnerRepositoryInterface {
  findUsersByPartnerId(partnerId: string): Promise<User[]>;
}