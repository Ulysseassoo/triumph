import { Crash } from "../../../domain/entities/crash.entity";
import { CrashRepositoryInterface } from "../../repositories/CrashRepositoryInterface";

export class UpdateCrashUseCase {
  constructor(private readonly crashRepo: CrashRepositoryInterface) {}

  async execute({
    id,
    type,
    date,
    location,
    responsability,
    consequence,
    status,
    driver,
    moto,
  }: Crash): Promise<Crash> {
    const crash = await this.crashRepo.findById(id);

    if (!crash) {
      throw new Error(`Crash does not exist with id: ${id}`);
    }

    const updateData = {
      ...(type && { type }),
      ...(date && { date }),
      ...(location && { location }),
      ...(responsability && { responsability }),
      ...(consequence && { consequence }),
      ...(status && { status }),
      ...(driver && { driver }),
      ...(moto && { moto }),
    };

    const updatedCrash = await this.crashRepo.update(id, updateData);
    if (!updatedCrash) {
      throw new Error(`Failed to update crash with id : ${id}`);
    }

    return updatedCrash;
  }
}
