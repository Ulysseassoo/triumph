import { v4 } from "uuid";
import { CorrectiveAction } from "../../../domain/entities/corrective-action.entity";
import { CorrectiveActionRepositoryInterface } from "../../repositories/CorrectiveActionRepositoryInterface";

export class AddCorrectiveActionUseCase {
  constructor(private readonly actionCorrectiveRepository: CorrectiveActionRepositoryInterface) {}

  async execute(reparationId: string, description: string): Promise<CorrectiveAction> {
    const actionCorrective = new CorrectiveAction(
      v4(),
      reparationId,
      description,
      new Date(),
    );

    await this.actionCorrectiveRepository.save(actionCorrective);
    return actionCorrective;
  }
}