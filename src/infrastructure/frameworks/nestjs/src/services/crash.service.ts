import { Injectable, Inject } from '@nestjs/common';
import { Crash } from '../../../../../domain/entities/crash.entity';
import {
  CrashFiltersType,
  CrashRepositoryInterface,
} from '../../../../../application/repositories/CrashRepositoryInterface';
import {
  CreateCrashUseCase,
  CrashWithoutId,
} from '../../../../../application/usecases/crash/CreateCrashUseCase';
import { UpdateCrashUseCase } from '../../../../../application/usecases/crash/UpdateCrashUseCase';
import { DeleteCrashUseCase } from '../../../../../application/usecases/crash/DeleteCrashUseCase';

@Injectable()
export class CrashService {
  constructor(
    @Inject('CrashRepositoryInterface')
    private readonly crashRepository: CrashRepositoryInterface,
  ) {}

  async create({
    type,
    date,
    location,
    description,
    responsability,
    consequence,
    status,
    driver,
    moto,
  }: CrashWithoutId): Promise<Crash> {
    const createCrashUseCase = new CreateCrashUseCase(this.crashRepository);

    return await createCrashUseCase.execute({
      type,
      date,
      location,
      description,
      responsability,
      consequence,
      status,
      driver,
      moto,
    });
  }

  async update(id: string, crashData: Crash): Promise<Crash> {
    const updateCrashUseCase = new UpdateCrashUseCase(this.crashRepository);
    return await updateCrashUseCase.execute({
      id,
      ...crashData,
    });
  }

  async delete(id: string): Promise<void> {
    const deleteCrashUseCase = new DeleteCrashUseCase(this.crashRepository);
    await deleteCrashUseCase.execute(id);
  }

  async findById(id: string): Promise<Crash> {
    return await this.crashRepository.findById(id);
  }

  async findAll(filters?: CrashFiltersType): Promise<Crash[]> {
    return await this.crashRepository.findAll(filters);
  }
}
