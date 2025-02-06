import { CorrectiveAction } from "./corrective-action.entity";

export class Reparation {
  constructor(
    public readonly id: string,
    public readonly breakdownId: string,
    public readonly date: Date,
    public readonly description: string,
    public readonly cost: number,
    public correctiveActions: CorrectiveAction[] = [],
  ) {}
}