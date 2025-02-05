import { v4 } from "uuid";
import { ReparationRepositoryInterface } from "../../repositories/ReparationRepositoryInterface";
import { Reparation } from "../../../domain/entities/reparation.entity";

export class CreateReparationUseCase {
  constructor(private readonly reparationRepository: ReparationRepositoryInterface) {}

  async execute(breakdownId: string, description: string, cost: number): Promise<Reparation> {
    const reparation = new Reparation(
      v4(),
      breakdownId,
      new Date(),
      description,
      cost,
    );

    await this.reparationRepository.save(reparation);
    return reparation;
  }
}