export interface Breakdown {
  id: string;
  motoId: string;
  description: string;
  warrantyId?: string;
  status: "PENDING" | "DIAGNOSED" | "RESOLVED";
  date: string;
}
