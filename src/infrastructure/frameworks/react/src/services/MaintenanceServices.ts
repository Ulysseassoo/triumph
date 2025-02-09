import { Maintenance } from "@/interfaces/MaintenanceInterface";
import apiEntities from ".";

export const getMaintenanceHistory = async (motoId: string) => {
  const response = await apiEntities.get<Maintenance[]>(
    `/maintenances/motos/${motoId}/history`
  );
  return response.data;
};

export const getMaintenanceById = async (id: string | undefined) => {
  const response = await apiEntities.get<Maintenance>("/maintenances/" + id);
  return response.data;
};

export const createMaintenance = async (data: {
  motoId: string;
  kilometrageInterval: number;
  recommandations: string;
  tempsInterval: number;
}) => {
  const response = await apiEntities.post<Maintenance>("/maintenances", data);
  return response.data;
};

export const updateMaintenance = async (
  id: string,
  data: {
    motoId: string;
    kilometrageInterval: number;
    recommandations: string | undefined | null;
    tempsInterval: number;
  }
) => {
  const response = await apiEntities.put<Maintenance>(
    "/maintenances/" + id,
    data
  );
  return response.data;
};

export const getMaintenances = async () => {
  const response = await apiEntities.get<Maintenance[]>("/maintenances");
  return response.data;
};

export const scheduleMaintenance = async (data: {
  motoId: string;
  modelType: "STREET_TRIPLE" | "TIGER_SPORT_660";
  manualMileage?: number;
}) => {
  const response = await apiEntities.post<Maintenance>(
    "/maintenances/planifier",
    data
  );
  return response.data;
};
