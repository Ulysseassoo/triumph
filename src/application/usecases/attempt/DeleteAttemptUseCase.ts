import { AttemptRepositoryInterface } from "../../repositories/AttemptRepositoryInterface";

export class DeleteAttemptUseCase {
  constructor(private readonly attemptRepo: AttemptRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const attempt = await this.attemptRepo.findById(id);

    if (!attempt) {
      throw new Error(`Attempt does not exist with id : ${id}`);
    }

    return await this.attemptRepo.delete(id);
  }
}
