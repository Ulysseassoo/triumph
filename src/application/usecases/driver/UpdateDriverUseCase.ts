import { Driver } from "../../../domain/entities/driver.entity";
import { DriverRepositoryInterface } from "../../repositories/DriverRepositoryInterface";

export class UpdateDriverUseCase {
  constructor(private readonly driverRepo: DriverRepositoryInterface) {}

  async execute({
    id,
    firstname,
    lastname,
    birthdate,
    addresse,
    licenses,
    experiences,
    crashes,
    attempts,
  }: Driver): Promise<Driver> {
    const driver = await this.driverRepo.findById(id);

    if (!driver) {
      throw new Error(`Driver does not exist with id: ${id}`);
    }

    const updateData = {
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      ...(birthdate && { birthdate }),
      ...(addresse && { addresse }),
      ...(licenses && { licenses }),
      ...(experiences && { experiences }),
      ...(attempts && { attempts }),
      ...(crashes && { crashes }),
    };

    const updatedDriver = await this.driverRepo.update(id, updateData);
    if (!updatedDriver) {
      throw new Error(`Failed to update driver with id : ${id}`);
    }

    return updatedDriver;
  }
}
