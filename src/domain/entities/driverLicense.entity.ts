import { Driver } from "./driver.entity";

export class DriverLicense {
  constructor(
    public readonly id: string,
    public licenseNumber: string,
    public category: string,
    public expiryDate: Date,
    public obtainDate: Date,
    public country: string,
    public status: string,
    public driver: Driver
  ) {}
}
