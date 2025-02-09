import { Crash } from "@/interfaces/CrashInterface";
import { Driver } from "@/interfaces/DriverInterface";
import { Moto } from "@/interfaces/MotoInterface";
import apiEntities from ".";

export const getCrashes = async () => {
  const response = await apiEntities.get<Crash[]>("/crashes");
  return response.data;
};

export const getCrashById = async (id: string) => {
  const response = await apiEntities.get<Crash>(`/crashes/${id}`);
  return response.data;
};

export const addCrash = async (data: {
  type: string;
  date: Date;
  description: string;
  location: string;
  responsability: string;
  consequence: string;
  status: string;
  driver: Driver;
  moto: Moto;
}) => {
  const response = await apiEntities.post<Crash>("/crashes", data);
  return response.data;
};

export const updateCrash = async (data: {
  id: string;
  type: string;
  date: string;
  description: string;
  location: string;
  responsability: string;
  consequence: string;
  status: string;
  driver: Driver;
  moto: Moto;
}) => {
  const response = await apiEntities.put<Crash>(`/crashes/${data.id}}`, data);
  return response.data;
};
