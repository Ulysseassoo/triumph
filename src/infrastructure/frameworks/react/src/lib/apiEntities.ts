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
  date: string;
}

export interface Notification {
  id: string;
  userId: string;
  date: Date;
  message: string;
  isRead: boolean;
}

export interface Driver {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  addresse: string;
  experiences: DriverExperience[];
  licenses: DriverLicense[];
}

export interface Attempt {
  id: string;
  startDate: Date;
  endDate: Date;
  startKilometer: number;
  endKilometer: number;
  status: string;
}

export interface Crash {
  id: string;
  type: string;
  date: Date;
  description: string;
  location: string;
  responsability: string;
  consequence: string;
  status: string;
}

export interface DriverExperience {
  id: string;
  duration: number;
  type: string;
  rented: boolean;
  professional: boolean;
  feedback: string;
}

export interface DriverLicense {
  id: string;
  licenseNumber: string;
  category: string;
  expiryDate: Date;
  obtainDate: Date;
  country: string;
}

export interface Repair {
  id: string;
  breakdownId: string;
  description: string;
  cost: number;
  date: string;
}

export interface CorrectiveAction {
  id: string;
  repairId: string;
  description: string;
  date: string;
}

export const getMaintenances = async () => {
  const response = await apiEntities.get<Maintenance[]>("/maintenances");
  return response.data;
};

export const getMotos = async () => {
  const response = await apiEntities.get<Moto[]>("/motos");
  return response.data;
};

export const getMotoById = async (motoId: string | undefined) => {
  const response = await apiEntities.get<Moto>("/motos/" + motoId);
  return response.data;
};

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
}

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
export const getBreakdownById = async (id: string | undefined) => {
  const response = await apiEntities.get<Breakdown>("/breakdowns/" + id);
  return response.data;
};
export const getWarranties = async () => {
  const response = await apiEntities.get<Warranty[]>("/warranties");
  return response.data;
};

export const getUserNotifications = async (userId?: string) => {
  const response = await apiEntities.get<Notification[]>("/notifications/user/" + userId);
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

// drivers

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

// attempt

export const getAttempts = async () => {
  const response = await apiEntities.get<Attempt[]>("/attempts");
  return response.data;
};

export const addAttempt = async (data: {
  startDate: Date;
  endDate: Date;
  startKilometer: number;
  endKilometer: number;
  status: string;
}) => {
  const response = await apiEntities.post<Attempt>("/attempts", data);
  return response.data;
};

// crash

export const getCrashes = async () => {
  const response = await apiEntities.get<Crash[]>("/crashes");
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
}) => {
  const response = await apiEntities.post<Crash>("/crashes", data);
  return response.data;
};

export const getRepairs = async (breakdownId: string) => {
  const response = await apiEntities.get<Repair[]>(`/reparations/breakdowns/${breakdownId}`);
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

export const getCorrectiveActions = async (repairId: string) => {
  const response = await apiEntities.get<CorrectiveAction[]>(`/corrective-actions/reparation/${repairId}`);
  return response.data;
};

export const createCorrectiveAction = async (data: {
  description: string;
  reparationId: string;
}) => {
  const response = await apiEntities.post<CorrectiveAction>(`/corrective-actions`, data);
  return response.data;
};

export default apiEntities;
