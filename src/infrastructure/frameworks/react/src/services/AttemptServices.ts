import { Attempt, AttemptStatus } from "@/interfaces/AttemptInterface";
import { Driver } from "@/interfaces/DriverInterface";
import { Moto } from "@/interfaces/MotoInterface";
import apiEntities from ".";

export const getAttempts = async () => {
  const response = await apiEntities.get<Attempt[]>("/attempts");
  return response.data;
};

export const getAttemptById = async (id: string) => {
  const response = await apiEntities.get<Attempt>(`/attempts/${id}`);
  return response.data;
};

export const addAttempt = async (data: {
  startDate: Date;
  endDate: Date;
  startKilometer: number;
  endKilometer: number;
  status: AttemptStatus;
  driver: Driver;
  moto: Moto;
}) => {
  const response = await apiEntities.post<Attempt>("/attempts", data);
  return response.data;
};

export const updateAttempt = async (data: {
  id: string;
  startDate: Date;
  endDate: Date;
  startKilometer: string;
  endKilometer: string;
  status: string;
  driver: Driver;
  moto: Moto;
}) => {
  const response = await apiEntities.put<Attempt>(`/attempts/${data.id}`, data);
  return response.data;
};
