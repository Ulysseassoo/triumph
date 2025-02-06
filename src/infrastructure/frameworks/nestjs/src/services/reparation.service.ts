import { Injectable, Inject } from '@nestjs/common';
import { ReparationRepositoryInterface } from '../../../../../application/repositories/ReparationRepositoryInterface';
import { Reparation } from '../../../../../domain/entities/reparation.entity';
import { CreateReparationUseCase } from './../../../../../application/usecases/reparation/CreateReparationUseCase';

@Injectable()
export class ReparationService {
  constructor(
    @Inject('ReparationRepositoryInterface')
    private readonly reparationRepository: ReparationRepositoryInterface,
  ) {}

  async createReparation(
    breakdownId: string,
    description: string,
    cost: number,
  ): Promise<Reparation> {
    const createReparationUseCase = new CreateReparationUseCase(
      this.reparationRepository,
    );
    return await createReparationUseCase.execute(
      breakdownId,
      description,
      cost,
    );
  }

  async findByBreakdownId(breakdownId: string): Promise<Reparation[]> {
    return await this.reparationRepository.findByBreakdownId(breakdownId);
  }
}
