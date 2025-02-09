import { Attempt } from "./AttemptInterface";
import { DriverExperience } from "./DriverExperienceInterface";
import { DriverLicense } from "./DriverLicenseInterface";

export interface Driver {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: string;
  addresse: string;
  experiences?: DriverExperience[];
  licenses?: DriverLicense[];
  attempts?: Attempt[];
}
