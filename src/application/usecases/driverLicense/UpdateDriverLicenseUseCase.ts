import { DriverLicense } from "../../../domain/entities/driverLicense.entity";
import { DriverLicenseRepositoryInterface } from "../../repositories/DriverLicenseRepositoryInterface";

export class UpdateDriverLicenseUseCase {
  constructor(
    private readonly driverLicenseRepo: DriverLicenseRepositoryInterface
  ) {}

  async execute({
    id,
    licenseNumber,
    category,
    expiryDate,
    obtainDate,
    country,
    status,
  }: DriverLicense): Promise<DriverLicense> {
    const driverLicense = await this.driverLicenseRepo.findById(id);

    if (!driverLicense) {
      throw new Error(`Driver License does not exist with id: ${id}`);
    }

    const updateData = {
      ...(licenseNumber && { licenseNumber }),
      ...(category && { category }),
      ...(expiryDate && { expiryDate }),
      ...(obtainDate && { obtainDate }),
      ...(country && { country }),
      ...(status && { status }),
    };

    const updatedDriverLicense = await this.driverLicenseRepo.update(
      id,
      updateData
    );
    if (!updatedDriverLicense) {
      throw new Error(`Failed to update driver license with id : ${id}`);
    }

    return updatedDriverLicense;
  }
}
