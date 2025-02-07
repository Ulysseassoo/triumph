import { Driver } from "../../../domain/entities/driver.entity";
import { DriverRepositoryInterface } from "../../repositories/DriverRepositoryInterface";

type DriverFilters = {
  firstname: string;
  lastname: string;
  birthdate: string;
  addresse: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};

export class ListDriversUseCase {
  constructor(private readonly driverRepo: DriverRepositoryInterface) {}

  async execute(DriverFilters: DriverFilters): Promise<{
    data: Driver[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { firstname, lastname, birthdate, addresse } = DriverFilters;
    const { page = 1, limit = 10 } = DriverFilters.pagination;
    const offset = (page - 1) * limit;

    const drivers = await this.driverRepo.findAll({
      firstname,
      lastname,
      birthdate,
      addresse,
      pagination: { offset, limit },
    });

    return {
      data: drivers,
      total: drivers.length,
      page,
      limit,
    };
  }
}

export class ListDriverUseCase {
  constructor(private readonly driverRepo: DriverRepositoryInterface) {}

  async execute(id: string): Promise<{
    data: Driver;
  }> {
    const driver = await this.driverRepo.findById(id);

    return {
      data: driver,
    };
  }
}
