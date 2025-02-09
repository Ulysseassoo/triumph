import { Driver } from "./driver.entity";

export enum DriverLicenseStatus {
  VALID = "Valide",
  SUSPENDED = "Suspendu",
  REVOKED = "Révoqué",
  EXPIRED = "Expiré",
  PENDING = "En attente",
}

export class DriverLicense {
  constructor(
    public readonly id: string,
    public licenseNumber: string,
    public category: string,
    public expiryDate: Date,
    public obtainDate: Date,
    public country: string,
    public status: DriverLicenseStatus = DriverLicenseStatus.VALID,
    public driver: Driver
  ) {}
}
