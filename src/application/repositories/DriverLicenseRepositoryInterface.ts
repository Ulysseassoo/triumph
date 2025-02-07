import { DriverLicense } from "../../domain/entities/driverLicense.entity";

export type DriverLicenseFiltersType = {
  licenseNumber: string;
  category: string;
  expiryDate: string;
  obtainDate: string;
  country: string;
  status: string;
  pagination: {
    offset: number;
    limit: number;
  };
};

export interface DriverLicenseRepositoryInterface {
  create(driverLicense: DriverLicense): Promise<DriverLicense>;
  findById(id: string): Promise<DriverLicense | null>;
  findAll(filters?: DriverLicenseFiltersType): Promise<DriverLicense[]>;
  update(
    id: string,
    driverLicense: Partial<DriverLicense>
  ): Promise<DriverLicense>;
  delete(id: string): Promise<void>;
}
