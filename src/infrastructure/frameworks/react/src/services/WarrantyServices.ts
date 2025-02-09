import { Warranty } from "@/interfaces/WarrantyInterface";
import apiEntities from ".";

export const getWarranties = async () => {
  const response = await apiEntities.get<Warranty[]>("/warranties");
  return response.data;
};

export const addWarranty = async (data: {
  motoId: string;
  startDate: string;
  endDate: string;
}) => {
  const response = await apiEntities.post<Warranty>("/warranties", data);
  return response.data;
};
