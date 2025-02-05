import { CorrectiveAction } from "../../domain/entities/corrective-action.entity";

export interface CorrectiveActionRepositoryInterface {
  save(correctiveAction: CorrectiveAction): Promise<void>;
  findByReparationId(reparationId: string): Promise<CorrectiveAction[]>;
}