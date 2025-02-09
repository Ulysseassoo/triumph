import { Driver } from "./DriverInterface";
import { Moto } from "./MotoInterface";

export interface Attempt {
  id: string;
  startDate: string;
  endDate: string;
  startKilometer: string;
  endKilometer: string;
  status: AttemptStatus;
  driver: Driver;
  moto: Moto;
}

export enum AttemptStatus {
  CANCEL = "Annulé",
  FINISHED = "Terminé",
  GOING = "En cours",
}
