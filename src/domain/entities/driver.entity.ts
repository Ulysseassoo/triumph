import { Crash } from "./crash.entity";
import { DriverExperience } from "./driverExperience.entity";
import { DriverLicense } from "./driverLicense.entity";

export class Driver {
  constructor(
    public readonly id: string,
    public firstname: string,
    public lastname: string,
    public birthdate: Date,
    public addresse: string,
    public licenses: DriverLicense[],
    public experiences: DriverExperience[],
    public crash: Crash
  ) {}
}
