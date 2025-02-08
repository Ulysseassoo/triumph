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

export const getLastPlannedMaintenanceDate = (
  maintenances: Maintenance[]
): Date | null => {
  if (!maintenances || maintenances.length === 0) {
    return null;
  }

  const sortedMaintenances = maintenances
    .filter((maintenance) => maintenance.plannedDate)
    .sort(
      (a, b) =>
        new Date(b.plannedDate).getTime() - new Date(a.plannedDate).getTime()
    );

  return sortedMaintenances.length > 0
    ? new Date(sortedMaintenances[0].plannedDate)
    : null;
};