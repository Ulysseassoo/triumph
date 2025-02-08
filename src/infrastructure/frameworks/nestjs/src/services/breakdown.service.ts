import { Injectable, Inject } from '@nestjs/common';
import { BreakdownRepositoryInterface } from '../../../../../application/repositories/BreakdownRepositoryInterface';
import { Breakdown } from '../../../../../domain/entities/breakdown.entity';
import { CreateBreakdownUseCase } from './../../../../../application/usecases/breakdown/CreateBreakdownUseCase';
import { AssociateWarrantyUseCase } from './../../../../../application/usecases/warranty/AssociateWarrantyUseCase';
import { WarrantyRepositoryInterface } from '../../../../../application/repositories/WarrantyRepositoryInterface';

@Injectable()
export class BreakdownService {
  constructor(
    @Inject('BreakdownRepositoryInterface')
    private readonly breakdownRepository: BreakdownRepositoryInterface,
    @Inject('WarrantyRepositoryInterface')
    private readonly warrantyRepository: WarrantyRepositoryInterface,
  ) {}

  async createBreakdown(
    motoId: string,
    description: string,
  ): Promise<Breakdown> {
    const createBreakdownUseCase = new CreateBreakdownUseCase(
      this.breakdownRepository,
    );
    return await createBreakdownUseCase.execute(motoId, description);
  }

  async associateWarranty(
    breakdownId: string,
    warrantyId: string,
  ): Promise<void> {
    const breakdown = await this.breakdownRepository.findById(breakdownId);
    if (!breakdown) {
      throw new Error('Breakdown not found');
    }
    const associateWarrantyUseCase = new AssociateWarrantyUseCase(
      this.breakdownRepository,
      this.warrantyRepository,
    );
    await associateWarrantyUseCase.execute(breakdownId, warrantyId);
  }

  async findAll(): Promise<Breakdown[]> {
    return await this.breakdownRepository.findAll();
  }

  async findById(id: string): Promise<Breakdown | null> {
    return await this.breakdownRepository.findById(id);
  }

  async findByMotoId(motoId: string): Promise<Breakdown[]> {
    return await this.breakdownRepository.findByMotoId(motoId);
  }
}
