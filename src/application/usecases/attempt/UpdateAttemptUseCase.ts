import { Attempt } from "../../../domain/entities/attempt.entity";
import { AttemptRepositoryInterface } from "../../repositories/AttemptRepositoryInterface";

export class UpdateAttemptUseCase {
  constructor(private readonly attemptRepo: AttemptRepositoryInterface) {}

  async execute({
    id,
    startDate,
    endDate,
    startKilometer,
    endKilometer,
    status,
    driver,
    moto,
  }: Attempt): Promise<Attempt> {
    const attempt = await this.attemptRepo.findById(id);

    if (!attempt) {
      throw new Error(`Attempt does not exist with id: ${id}`);
    }

    const updateData = {
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      ...(startKilometer && { startKilometer }),
      ...(endKilometer && { endKilometer }),
      ...(status && { status }),
      ...(driver && { driver }),
      ...(moto && { moto }),
    };

    const updatedAttempt = await this.attemptRepo.update(id, updateData);
    if (!updatedAttempt) {
      throw new Error(`Failed to update attempt with id : ${id}`);
    }

    return updatedAttempt;
  }
}
