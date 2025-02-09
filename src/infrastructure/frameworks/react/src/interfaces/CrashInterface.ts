import { Driver } from "./DriverInterface";
import { Moto } from "./MotoInterface";

export enum CrashStatus {
  GOING = "En cours",
  RESOLVED = "Résolu",
}
export interface Crash {
  id: string;
  type: string;
  date: string;
  description: string;
  location: string;
  responsability: string;
  consequence: string;
  status: CrashStatus;
  driver: Driver;
  moto: Moto;
}
