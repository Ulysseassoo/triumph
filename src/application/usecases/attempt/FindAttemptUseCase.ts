import { Attempt } from "../../../domain/entities/attempt.entity";
import { AttemptRepositoryInterface } from "../../repositories/AttemptRepositoryInterface";

type AtttemptFilters = {
  startDate: string;
  endDate: string;
  startKilometer: number;
  endKilometer: number;
  status: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};

export class ListAttemptsUseCase {
  constructor(private readonly attemptRepo: AttemptRepositoryInterface) {}

  async execute(attemptFilters: AtttemptFilters): Promise<{
    data: Attempt[];
    total: number;
    page: number;
    limit: number;
  }> {
    const { startDate, endDate, startKilometer, endKilometer, status } =
      attemptFilters;
    const { page = 1, limit = 10 } = attemptFilters.pagination;
    const offset = (page - 1) * limit;

    const attempts = await this.attemptRepo.findAll({
      startDate,
      endDate,
      startKilometer,
      endKilometer,
      status,
      pagination: { offset, limit },
    });

    return {
      data: attempts,
      total: attempts.length,
      page,
      limit,
    };
  }
}

export class ListAttemptUseCase {
  constructor(private readonly attemptRepo: AttemptRepositoryInterface) {}

  async execute(id: string): Promise<{
    data: Attempt;
  }> {
    const attempt = await this.attemptRepo.findById(id);

    return {
      data: attempt,
    };
  }
}
