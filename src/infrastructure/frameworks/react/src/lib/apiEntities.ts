import axios from "axios";

const apiEntities = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiEntities.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Maintenance {
  id: string;
  motoId: string;
  plannedDate: string;
  status: "DUE" | "COMPLETED" | "OVERDUE";
}

export enum MotoStatus {
  InService = "En service",
  Broken = "En panne",
  UnderMaintenance = "En maintenance",
}

export interface Moto {
  id: string;
  model: string;
  partner: Partner;
  currentMileage: number;
  price: number;
  status: MotoStatus;
  maintenances?: Maintenance[];
}

export interface Partner {
  id: string;
  name: string;
  contactInfo: string;
}

export enum MaintenanceType {
  PREVENTIF = "Preventif",
  CURATIF = "Curatif",
}

export interface MaintenanceInterval {
  mileage: number;
  timeInMonths: number;
}

export interface Piece {
  id: string;
  name: string;
  type: string;
  cost: number;
  quantity: number;
  alertLimit: number;
}

export interface Maintenance {
  id: string;
  motoId: string;
  maintenanceType: MaintenanceType;
  plannedDate: string;
  mileage: number;
  achievedDate?: Date | null;
  maintenanceInterval: MaintenanceInterval;
  recommandations?: string | null;
  cost?: number | null;
  pieces?: Piece[];
}

export interface Warranty {
  id: string;
  motoId: string;
  startDate: Date;
  endDate: Date;
  breakdowns: Breakdown[];
}

export interface Breakdown {
  id: string;
  motoId: string;
  description: string;
  warrantyId?: string;
  status: "PENDING" | "DIAGNOSED" | "RESOLVED";
  createdAt: string;
}

export const getMaintenances = async () => {
  const response = await apiEntities.get<Maintenance[]>("/maintenances");
  return response.data;
};

export const getMotos = async () => {
  const response = await apiEntities.get<Moto[]>("/motos");
  return response.data;
};

export const getMaintenanceHistory = async (motoId: string) => {
  const response = await apiEntities.get<Maintenance[]>(
    `/maintenances/historique/${motoId}`
  );
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

export default apiEntities;
