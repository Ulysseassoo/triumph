import { Piece } from "./PieceInterface";

export interface Maintenance {
  id: string;
  motoId: string;
  maintenanceType: MaintenanceType;
  plannedDate: string;
  mileage: number;
  achievedDate?: Date | null;
  maintenanceInterval: MaintenanceInterval;
  recommandations?: string | null;
  cost?: number | null;
  pieces?: Piece[];
}

export interface MaintenanceInterval {
  mileage: number;
  timeInMonths: number;
}

export enum MaintenanceType {
  PREVENTIF = "Preventif",
  CURATIF = "Curatif",
}
