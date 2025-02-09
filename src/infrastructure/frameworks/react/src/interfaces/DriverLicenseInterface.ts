export enum DriverLicenseStatus {
  VALID = "Valide",
  SUSPENDED = "Suspendu",
  REVOKED = "Révoqué",
  EXPIRED = "Expiré",
  PENDING = "En attente",
}
export interface DriverLicense {
  id: string;
  licenseNumber: string;
  category: string;
  expiryDate: Date;
  obtainDate: Date;
  country: string;
  status: DriverLicenseStatus;
}
