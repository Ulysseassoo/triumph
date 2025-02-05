import { Breakdown } from "./breakdown.entity";

export class Warranty {
  constructor(
    public readonly id: string,
    public readonly motoId: string,
    public readonly startDate: Date,
    public readonly endDate: Date,
    public breakdowns: Breakdown[] = [],
  ) {}
}