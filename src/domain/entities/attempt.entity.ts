import { Driver } from "./driver.entity";
import { Moto } from "./moto.entity";

export class Attempt {
  constructor(
    public readonly id: string,
    public startDate: Date,
    public endDate: Date,
    public startKilometer: number,
    public endKilometer: number,
    public status: string,
    public moto: Moto,
    public driver: Driver
  ) {}
}
