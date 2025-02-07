import { DriverLicense } from "../../../domain/entities/driverLicense.entity";
import { DriverLicenseRepositoryInterface } from "../../repositories/DriverLicenseRepositoryInterface";

type DriverLicenseFilters = {
  licenseNumber: string;
  category: string;
  expiryDate: string;
  obtainDate: string;
  country: string;
  status: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};

export class ListDriverLicensesUseCase {
  constructor(
    private readonly driverLicenseRepo: DriverLicenseRepositoryInterface
  ) {}

  async execute(DriverLicenseFilters: DriverLicenseFilters): Promise<{
    data: DriverLicense[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { licenseNumber, category, expiryDate, obtainDate, country, status } =
      DriverLicenseFilters;
    const { page = 1, limit = 10 } = DriverLicenseFilters.pagination;
    const offset = (page - 1) * limit;

    const driverLicenses = await this.driverLicenseRepo.findAll({
      licenseNumber,
      category,
      expiryDate,
      obtainDate,
      country,
      status,
      pagination: { offset, limit },
    });

    return {
      data: driverLicenses,
      total: driverLicenses.length,
      page,
      limit,
    };
  }
}

export class ListDriverLicenseUseCase {
  constructor(
    private readonly driverLicenseRepo: DriverLicenseRepositoryInterface
  ) {}

  async execute(id: string): Promise<{
    data: DriverLicense;
  }> {
    const driverLicense = await this.driverLicenseRepo.findById(id);

    return {
      data: driverLicense,
    };
  }
}
