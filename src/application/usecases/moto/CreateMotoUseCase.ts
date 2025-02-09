import { Moto, MotoStatus } from "../../../domain/entities/moto.entity";
import { v4 } from "uuid";
import { MotoRepositoryInterface } from "../../repositories/MotoRepositoryInterface";
import { PartnerRepositoryInterface } from "../../repositories/PartnerRepositoryInterface";
import { Attempt } from "../../../domain/entities/attempt.entity";
interface Props {
  model: string;
  clientId: string;
  currentMileage: number;
  price: number;
  status: MotoStatus;
}
export class CreateMotoUseCase {
  constructor(
    private readonly motoRepository: MotoRepositoryInterface,
    private readonly partnerRepository: PartnerRepositoryInterface
  ) {}
  async execute({
    model,
    clientId,
    currentMileage,
    price,
    status,
  }: Props): Promise<Moto | null> {
    const partner = await this.partnerRepository.findById(clientId);
    if (!partner) {
      throw new Error("Partner not found");
    }

    const moto = new Moto(v4(), model, partner, currentMileage, price, status);
    const newMoto = await this.motoRepository.create(moto);
    return newMoto;
  }
}
