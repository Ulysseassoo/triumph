import { Moto } from "@/interfaces/MotoInterface";
import apiEntities from ".";

export const getMotos = async () => {
  const response = await apiEntities.get<Moto[]>("/motos");
  return response.data;
};

export const getMotoById = async (motoId: string | undefined) => {
  const response = await apiEntities.get<Moto>("/motos/" + motoId);
  return response.data;
};
