import { Breakdown } from "@/interfaces/BreakdownInterface";
import apiEntities from ".";

export const reportBreakdown = async (data: {
  motoId: string;
  description: string;
  warrantyId?: string;
}) => {
  const response = await apiEntities.post<Breakdown>("/breakdowns", data);
  return response.data;
};

export const getBreakdowns = async () => {
  const response = await apiEntities.get<Breakdown[]>("/breakdowns");
  return response.data;
};
export const getBreakdownById = async (id: string | undefined) => {
  const response = await apiEntities.get<Breakdown>("/breakdowns/" + id);
  return response.data;
};
