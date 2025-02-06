import { BreakdownRepositoryInterface } from "../../repositories/BreakdownRepositoryInterface";
import { WarrantyRepositoryInterface } from "../../repositories/WarrantyRepositoryInterface";

export class AssociateWarrantyUseCase {
  constructor(
    private readonly breakdownRepository: BreakdownRepositoryInterface,
    private readonly warrantyRepository: WarrantyRepositoryInterface,
  ) {}

  async execute(breakdownId: string, warrantyId: string): Promise<void> {
    const breakdown = await this.breakdownRepository.findById(breakdownId);
    const warranty = await this.warrantyRepository.findById(warrantyId);

    if (!breakdown || !warranty) {
      throw new Error('Panne ou garantie non trouvée');
    }

    breakdown.warranty = warranty;
    await this.breakdownRepository.save(breakdown);
  }
}