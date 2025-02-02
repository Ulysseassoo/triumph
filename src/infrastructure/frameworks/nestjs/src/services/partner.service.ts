import { Injectable, Inject } from '@nestjs/common';
import { v4 } from "uuid";
import { PartnerRepositoryInterface } from '../../../../../application/repositories/PartnerRepositoryInterface';
import { Partner } from '../../../../../domain/entities/partner.entity';

@Injectable()
export class PartnerService {
  constructor(
    @Inject('PartnerRepositoryInterface')
    private readonly partnerRepository: PartnerRepositoryInterface,
  ) {}

  async createPartner(nom: string, contactInfo: string): Promise<Partner> {
    const partner = new Partner(v4(), nom, contactInfo);
    return await this.partnerRepository.create(partner);
  }

  async findPartnerById(id: string): Promise<Partner | null> {
    return await this.partnerRepository.findById(id);
  }

  async findAllPartners(): Promise<Partner[]> {
    return await this.partnerRepository.findAll();
  }

  async updatePartner(id: string, partnerData: Partial<Partner>): Promise<void> {
    await this.partnerRepository.update(id, partnerData);
  }

  async deletePartner(id: string): Promise<void> {
    await this.partnerRepository.delete(id);
  }
}