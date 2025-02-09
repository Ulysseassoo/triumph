import { Attempt } from "./AttemptInterface";
import { Maintenance } from "./MaintenanceInterface";
import { Partner } from "./PartnerInterface";

export enum MotoStatus {
  InService = "En service",
  Broken = "En panne",
  UnderMaintenance = "En maintenance",
}

export interface Moto {
  id: string;
  model: string;
  partner: Partner;
  currentMileage: number;
  price: number;
  status: MotoStatus;
  maintenances?: Maintenance[];
  attempts?: Attempt[];
}
