import { Maintenance } from "@/lib/apiEntities";

export const getOverdueMaintenances = (maintenances: Maintenance[]): Maintenance[] => {
  const currentDate = new Date();
  return maintenances.filter(maintenance => 
    maintenance.plannedDate && new Date(maintenance.plannedDate) < currentDate && !maintenance.achievedDate
  );
};

export const getPendingMaintenances = (maintenances: Maintenance[]): Maintenance[] => {
  const currentDate = new Date();
  return maintenances.filter(maintenance => 
    maintenance.plannedDate && new Date(maintenance.plannedDate) >= currentDate && !maintenance.achievedDate
  );
};