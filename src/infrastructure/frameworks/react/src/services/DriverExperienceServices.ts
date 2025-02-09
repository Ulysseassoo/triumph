import { DriverExperience } from "@/interfaces/DriverExperienceInterface";
import { Driver } from "@/interfaces/DriverInterface";
import apiEntities from ".";

export const addDriverExperience = async (data: {
  duration: string;
  type: string;
  rented: boolean;
  professional: boolean;
  feedback: string;
  driver: Driver;
}) => {
  const response = await apiEntities.post<DriverExperience>(
    "/driver-experiences",
    data
  );
  return response.data;
};
