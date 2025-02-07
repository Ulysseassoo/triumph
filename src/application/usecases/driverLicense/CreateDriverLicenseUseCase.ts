import { v4 } from "uuid";
import { DriverLicense } from "../../../domain/entities/driverLicense.entity";
import { DriverLicenseRepositoryInterface } from "../../repositories/DriverLicenseRepositoryInterface";

export type DriverLicenseWithoutId = Omit<DriverLicense, "id">;

export class CreateDriverLicenseUseCase {
  constructor(
    private readonly driverLicenseRepository: DriverLicenseRepositoryInterface
  ) {}

  async execute({
    licenseNumber,
    category,
    expiryDate,
    obtainDate,
    country,
    status,
    driver,
  }: DriverLicenseWithoutId): Promise<DriverLicense | null> {
    const driverLicense = new DriverLicense(
      v4(),
      licenseNumber,
      category,
      expiryDate,
      obtainDate,
      country,
      status,
      driver
    );

    const newDriverLicense = await this.driverLicenseRepository.create(
      driverLicense
    );

    return newDriverLicense;
  }
}
