import { v4 } from "uuid";
import { Attempt } from "../../../domain/entities/attempt.entity";
import { AttemptRepositoryInterface } from "../../repositories/AttemptRepositoryInterface";

export type AttemptWithoutId = Omit<Attempt, "id">;

export class CreateAttemptUseCase {
  constructor(private readonly attemptRepository: AttemptRepositoryInterface) {}

  async execute({
    startDate,
    endDate,
    startKilometer,
    endKilometer,
    status,
    driver,
    moto,
  }: AttemptWithoutId): Promise<Attempt | null> {
    const attempt = new Attempt(
      v4(),
      startDate,
      endDate,
      startKilometer,
      endKilometer,
      status,
      moto,
      driver
    );

    const newAttempt = await this.attemptRepository.create(attempt);

    return newAttempt;
  }
}
