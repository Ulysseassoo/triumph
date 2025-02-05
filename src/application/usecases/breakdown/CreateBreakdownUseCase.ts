import { v4 } from "uuid";
import { Breakdown } from "../../../domain/entities/breakdown.entity";
import { BreakdownRepositoryInterface } from "../../repositories/BreakdownRepositoryInterface";

export class CreateBreakdownUseCase {
  constructor(private readonly breakdownRepository: BreakdownRepositoryInterface) {}

  async execute(motoId: string, description: string): Promise<Breakdown> {
    const breakdown = new Breakdown(
      v4(),
      motoId,
      description,
      new Date(),
    );

    await this.breakdownRepository.save(breakdown);
    return breakdown;
  }
}