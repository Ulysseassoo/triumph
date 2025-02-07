import { DriverExperience } from "./driverExperience.entity";
import { DriverLicense } from "./driverLicense.entity";

export class Attempt {
  constructor(
    public readonly id: string,
    public startDate: Date,
    public endDate: Date,
    public startKilometer: number,
    public endKilometer: number,
    public status: string,
    public licenses: DriverLicense[],
    public experiences: DriverExperience[]
  ) {}
}
