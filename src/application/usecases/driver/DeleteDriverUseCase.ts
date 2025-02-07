import { DriverRepositoryInterface } from "../../repositories/DriverRepositoryInterface";

export class DeleteDriverUseCase {
  constructor(private readonly driverRepo: DriverRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const driver = await this.driverRepo.findById(id);

    if (!driver) {
      throw new Error(`Driver does not exist with id : ${id}`);
    }

    return await this.driverRepo.delete(id);
  }
}
