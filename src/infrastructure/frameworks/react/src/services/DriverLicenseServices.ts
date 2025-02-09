import { Driver } from "@/interfaces/DriverInterface";
import {
  DriverLicense,
  DriverLicenseStatus,
} from "@/interfaces/DriverLicenseInterface";
import apiEntities from ".";

export const addDriverLicense = async (data: {
  licenseNumber: string;
  category: string;
  expiryDate: Date;
  obtainDate: Date;
  country: string;
  status: DriverLicenseStatus;
  driver: Driver;
}) => {
  const response = await apiEntities.post<DriverLicense>(
    "/driver-licenses",
    data
  );
  return response.data;
};
