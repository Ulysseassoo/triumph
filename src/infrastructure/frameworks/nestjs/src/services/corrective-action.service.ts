import { Injectable, Inject } from '@nestjs/common';
import { CorrectiveActionRepositoryInterface } from '../../../../../application/repositories/CorrectiveActionRepositoryInterface';
import { CorrectiveAction } from '../../../../../domain/entities/corrective-action.entity';
import { AddCorrectiveActionUseCase } from './../../../../../application/usecases/corrective-action/AddCorrectiveActionUseCase';


@Injectable()
export class CorrectiveActionService {
  constructor(
    @Inject('CorrectiveActionRepositoryInterface')
    private readonly correctiveActionRepository: CorrectiveActionRepositoryInterface,
  ) {}

  async createCorrectiveAction(reparationId: string, description: string): Promise<CorrectiveAction> {
    const createBreakdownUseCase = new AddCorrectiveActionUseCase(this.correctiveActionRepository);
    return await createBreakdownUseCase.execute(reparationId, description);
  }

  async findByReparationId(reparationId: string): Promise<CorrectiveAction[]> {
    return await this.correctiveActionRepository.findByReparationId(reparationId);
  }
}