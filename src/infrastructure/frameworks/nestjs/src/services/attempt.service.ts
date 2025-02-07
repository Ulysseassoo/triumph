import { Injectable, Inject } from '@nestjs/common';
import { Attempt } from '../../../../../domain/entities/attempt.entity';
import {
  AttemptFiltersType,
  AttemptRepositoryInterface,
} from '../../../../../application/repositories/AttemptRepositoryInterface';
import {
  CreateAttemptUseCase,
  AttemptWithoutId,
} from '../../../../../application/usecases/attempt/CreateAttemptUseCase';
import { UpdateAttemptUseCase } from '../../../../../application/usecases/attempt/UpdateAttemptUseCase';
import { DeleteAttemptUseCase } from '../../../../../application/usecases/attempt/DeleteAttemptUseCase';

@Injectable()
export class AttemptService {
  constructor(
    @Inject('AttemptRepositoryInterface')
    private readonly attemptRepository: AttemptRepositoryInterface,
  ) {}

  async create({
    startDate,
    endDate,
    startKilometer,
    endKilometer,
    status,
    licenses,
    experiences,
  }: AttemptWithoutId): Promise<Attempt> {
    const createAttemptUseCase = new CreateAttemptUseCase(
      this.attemptRepository,
    );

    return await createAttemptUseCase.execute({
      startDate,
      endDate,
      startKilometer,
      endKilometer,
      status,
      licenses,
      experiences,
    });
  }

  async update(id: string, attemptData: Attempt): Promise<Attempt> {
    const updateAttemptUseCase = new UpdateAttemptUseCase(
      this.attemptRepository,
    );
    return await updateAttemptUseCase.execute({
      id,
      ...attemptData,
    });
  }

  async delete(id: string): Promise<void> {
    const deletePieceUseCase = new DeleteAttemptUseCase(this.attemptRepository);
    await deletePieceUseCase.execute(id);
  }

  async findById(id: string): Promise<Attempt> {
    return await this.attemptRepository.findById(id);
  }

  async findAll(filters?: AttemptFiltersType): Promise<Attempt[]> {
    return await this.attemptRepository.findAll(filters);
  }
}
