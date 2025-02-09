import { Driver } from "./driver.entity";
import { Moto } from "./moto.entity";

export enum CrashStatus {
  GOING = "En cours",
  RESOLVED = "Résolu",
}
export class Crash {
  constructor(
    public readonly id: string,
    public type: string,
    public date: Date,
    public description: string,
    public location: string,
    public responsability: string,
    public consequence: string,
    public status: CrashStatus,
    public driver: Driver,
    public moto: Moto
  ) {}
}
