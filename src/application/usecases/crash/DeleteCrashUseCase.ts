import { CrashRepositoryInterface } from "../../repositories/CrashRepositoryInterface";

export class DeleteCrashUseCase {
  constructor(private readonly crashRepo: CrashRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    const crash = await this.crashRepo.findById(id);

    if (!crash) {
      throw new Error(`Crash does not exist with id : ${id}`);
    }

    return await this.crashRepo.delete(id);
  }
}
