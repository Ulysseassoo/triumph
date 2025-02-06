import { Warranty } from "./warranty.entity";
import { Reparation } from "./reparation.entity";

export class Breakdown {
  constructor(
    public readonly id: string,
    public readonly motoId: string,
    public readonly description: string,
    public readonly date: Date,
    public warranty: Warranty | null = null,
    public reparations: Reparation[] = [],
  ) {}
}