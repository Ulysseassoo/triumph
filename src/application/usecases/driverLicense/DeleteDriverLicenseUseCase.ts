import { DriverLicenseRepositoryInterface } from "../../repositories/DriverLicenseRepositoryInterface";

export class DeleteDriverLicenseUseCase {
  constructor(
    private readonly driverLicenseRepo: DriverLicenseRepositoryInterface
  ) {}

  async execute(id: string): Promise<void> {
    const driverLicense = await this.driverLicenseRepo.findById(id);

    if (!driverLicense) {
      throw new Error(`Driver License does not exist with id : ${id}`);
    }

    return await this.driverLicenseRepo.delete(id);
  }
}
