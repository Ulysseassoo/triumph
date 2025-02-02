import { MotoStatus } from '../../../../../domain/entities/moto.entity';
import { MotoRepositoryInterface } from './../../../../../application/repositories/MotoRepositoryInterface';
import { PartnerRepositoryInterface } from './../../../../../application/repositories/PartnerRepositoryInterface';
import { Injectable, Inject } from '@nestjs/common';
import { CreateMotoUseCase } from "../../../../../application/usecases/moto/CreateMotoUseCase";

@Injectable()
export class MotoService {
  constructor(
    @Inject('MotoRepositoryInterface')
    private readonly motoRepository: MotoRepositoryInterface,
    @Inject('PartnerRepositoryInterface')
    private readonly partnerRepository: PartnerRepositoryInterface,
  ) {}

  async createMoto(
    model: string,
    clientId: string,
    currentMileage: number,
    price: number,
    status: MotoStatus,
  ) {
    const createMotoUseCase = new CreateMotoUseCase(this.motoRepository, this.partnerRepository);
    return await createMotoUseCase.execute({
      model,
      clientId,
      currentMileage,
      price,
      status,
    });
  }
}