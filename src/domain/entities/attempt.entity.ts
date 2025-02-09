import { AttemptStatus } from "../../infrastructure/database/entities/attempt.orm-entity";
import { Driver } from "./driver.entity";
import { Moto } from "./moto.entity";

export class Attempt {
  constructor(
    public readonly id: string,
    public startDate: Date,
    public endDate: Date,
    public startKilometer: number,
    public endKilometer: number,
    public status: AttemptStatus,
    public moto: Moto,
    public driver: Driver
  ) {}
}
