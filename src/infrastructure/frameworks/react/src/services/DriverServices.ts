import { Driver } from "@/interfaces/DriverInterface";
import apiEntities from ".";

export const getDrivers = async () => {
  const response = await apiEntities.get<Driver[]>("/drivers");
  return response.data;
};

export const addDriver = async (data: {
  firstname: string;
  lastname: string;
  birthdate: Date;
  addresse: string;
}) => {
  const response = await apiEntities.post<Driver>("/drivers", data);
  return response.data;
};

export const getDriverById = async (id: string) => {
  const response = await apiEntities.get<Driver>(`/drivers/${id}`);
  return response.data;
};

export const updateDriver = async (data: Driver) => {
  const response = await apiEntities.put<Driver>(`/drivers/${data.id}`, data);
  return response.data;
};
