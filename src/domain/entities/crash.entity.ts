import { Driver } from "./driver.entity";
import { Moto } from "./moto.entity";

export class Crash {
  constructor(
    public readonly id: string,
    public type: string,
    public date: Date,
    public description: string,
    public location: string,
    public responsability: string,
    public consequence: string,
    public status: string,
    public driver: Driver,
    public moto: Moto
  ) {}
}
