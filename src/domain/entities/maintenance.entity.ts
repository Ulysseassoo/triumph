import { Piece } from "./piece.entity";

export enum MaintenanceType {
  PREVENTIF = "Preventif",
  CURATIF = "Curatif",
}

export type MaintenanceInterval = {
  mileage: number;
  timeInMonths: number;
};

export class Maintenance {
  constructor(
    public readonly id: string,
    public readonly motoId: string,
    public readonly maintenanceType: MaintenanceType,
    public readonly plannedDate: Date,
    public readonly mileage: number,
    public achievedDate: Date | null = null,
    public maintenanceInterval: MaintenanceInterval,
    public recommandations: string | null = null,
    public cost: number | null = null,
    public pieces: Piece[] = []
  ) {}

  calculateNextMaintenanceDate(currentMileage: number): Date {
    const nextMileage = this.mileage + this.maintenanceInterval.mileage;
    if (currentMileage >= nextMileage) {
      const nextDate = new Date(this.plannedDate);
      nextDate.setMonth(
        nextDate.getMonth() + this.maintenanceInterval.timeInMonths
      );
      return nextDate;
    }
    return this.plannedDate;
  }

  markAsAchieved(
    achievedDate: Date,
    cost: number,
    pieces: Piece[],
    recommandations: string
  ): void {
    this.achievedDate = achievedDate;
    this.cost = cost;
    this.pieces = pieces;
    this.recommandations = recommandations;
  }
}
