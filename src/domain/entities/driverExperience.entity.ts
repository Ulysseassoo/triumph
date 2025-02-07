import { Driver } from "./driver.entity";

export class DriverExperience {
  constructor(
    public readonly id: string,
    public duration: number,
    public type: string,
    public rented: boolean,
    public professional: boolean,
    public feedback: string,
    public driver: Driver
  ) {}
}
