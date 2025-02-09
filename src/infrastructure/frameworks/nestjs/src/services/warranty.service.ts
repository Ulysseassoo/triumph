import { Injectable, Inject } from '@nestjs/common';
import { WarrantyRepositoryInterface } from '../../../../../application/repositories/WarrantyRepositoryInterface';
import { Warranty } from '../../../../../domain/entities/warranty.entity';
import { CreateWarrantyDto } from 'src/dtos/warranty.dto';

@Injectable()
export class WarrantyService {
  constructor(
    @Inject('WarrantyRepositoryInterface')
    private readonly warrantyRepository: WarrantyRepositoryInterface,
  ) {}

  async createWarranty({
    motoId,
    startDate,
    endDate,
  }: CreateWarrantyDto): Promise<Warranty> {
    return await this.warrantyRepository.save({
      motoId,
      startDate,
      endDate,
    });
  }

  async findAll(): Promise<Warranty[]> {
    return await this.warrantyRepository.findAll();
  }

  async findById(id: string): Promise<Warranty | null> {
    return await this.warrantyRepository.findById(id);
  }
}
