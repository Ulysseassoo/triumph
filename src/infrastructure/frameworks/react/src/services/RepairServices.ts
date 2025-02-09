import { Repair } from "@/interfaces/RepairInterface";
import apiEntities from ".";

export const getRepairs = async (breakdownId: string) => {
  const response = await apiEntities.get<Repair[]>(
    `/reparations/breakdowns/${breakdownId}`
  );
  return response.data;
};

export const createRepair = async (data: {
  description: string;
  cost: number;
  breakdownId: string;
}) => {
  const response = await apiEntities.post<Repair>(`/reparations`, data);
  return response.data;
};
