import { Injectable, Inject } from '@nestjs/common';
import { WarrantyRepositoryInterface } from '../../../../../application/repositories/WarrantyRepositoryInterface';
import { Warranty } from '../../../../../domain/entities/warranty.entity';

@Injectable()
export class WarrantyService {
  constructor(
    @Inject('WarrantyRepositoryInterface')
    private readonly warrantyRepository: WarrantyRepositoryInterface,
  ) {}

  async createWarranty(warranty: Warranty): Promise<Warranty> {
    await this.warrantyRepository.save(warranty);
    return warranty;
  }

  async findAll(): Promise<Warranty[]> {
    return await this.warrantyRepository.findAll();
  }

  async findById(id: string): Promise<Warranty | null> {
    return await this.warrantyRepository.findById(id);
  }
}
