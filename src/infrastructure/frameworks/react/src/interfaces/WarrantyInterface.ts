import { Breakdown } from "./BreakdownInterface";

export interface Warranty {
  id: string;
  motoId: string;
  startDate: Date;
  endDate: Date;
  breakdowns: Breakdown[];
}
