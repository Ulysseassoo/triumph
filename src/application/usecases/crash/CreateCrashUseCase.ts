import { v4 } from "uuid";
import { Crash } from "../../../domain/entities/crash.entity";
import { CrashRepositoryInterface } from "../../repositories/CrashRepositoryInterface";

export type CrashWithoutId = Omit<Crash, "id">;

export class CreateCrashUseCase {
  constructor(private readonly crashRepository: CrashRepositoryInterface) {}

  async execute({
    type,
    date,
    description,
    location,
    responsability,
    consequence,
    status,
    driver,
    moto,
  }: CrashWithoutId): Promise<Crash | null> {
    const crash = new Crash(
      v4(),
      type,
      date,
      description,
      location,
      responsability,
      consequence,
      status,
      driver,
      moto
    );

    const newCrash = await this.crashRepository.create(crash);

    return newCrash;
  }
}
