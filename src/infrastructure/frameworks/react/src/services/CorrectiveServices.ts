import { CorrectiveAction } from "@/interfaces/CorrectiveInterface";
import apiEntities from ".";

export const getCorrectiveActions = async (repairId: string) => {
  const response = await apiEntities.get<CorrectiveAction[]>(
    `/corrective-actions/reparation/${repairId}`
  );
  return response.data;
};

export const createCorrectiveAction = async (data: {
  description: string;
  reparationId: string;
}) => {
  const response = await apiEntities.post<CorrectiveAction>(
    `/corrective-actions`,
    data
  );
  return response.data;
};
