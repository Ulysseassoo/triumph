import { Moto, MotoStatus } from "../../../domain/entities/moto.entity";
import { v4 } from "uuid"
import { MotoRepositoryInterface } from "../../repositories/MotoRepositoryInterface";
interface Props {
  model: string;
  clientId: string;
  currentMileage: number;
  price: number;
  status: MotoStatus;
}
export class CreateMotoUseCase {
  constructor(private readonly motoRepository: MotoRepositoryInterface) {}
  async execute({ model, clientId, currentMileage, price, status }: Props): Promise<Moto | null> {
  console.log("🚀 ~ CreateMotoUseCase ~ execute ~ model:", model)
    const moto = new Moto(
        v4(),
        model,
        clientId,
        currentMileage,
        price,
        status
    )
    console.log(this.motoRepository)
    const newMoto = await this.motoRepository.create(moto);
    return newMoto;
  }
}