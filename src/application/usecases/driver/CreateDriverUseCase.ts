import { v4 } from "uuid";
import { Driver } from "../../../domain/entities/driver.entity";
import { DriverRepositoryInterface } from "../../repositories/DriverRepositoryInterface";

export type DriverWithoutId = Omit<Driver, "id">;

export class CreateDriverUseCase {
  constructor(private readonly driverRepository: DriverRepositoryInterface) {}

  async execute({
    firstname,
    lastname,
    birthdate,
    addresse,
    licenses,
    experiences,
    crash,
  }: DriverWithoutId): Promise<Driver | null> {
    const driver = new Driver(
      v4(),
      firstname,
      lastname,
      birthdate,
      addresse,
      licenses,
      experiences,
      crash
    );

    const newDriver = await this.driverRepository.create(driver);

    return newDriver;
  }
}
