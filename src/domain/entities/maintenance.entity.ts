import { Piece } from "./piece.entity";

export enum MaintenanceType {
	PREVENTIF = 'Preventif',
	CURATIF = 'Curatif',
}

export type MaintenanceInterval = {
	mileage: number;
	timeInMonths: number;
};

export class Maintenance {
	constructor(
		public readonly id: string,
		public readonly motoId: string,
		public readonly maintenanceType: MaintenanceType,
		public readonly plannedDate: Date,
		public readonly mileage: number,
		public achievedDate: Date | null = null,
		public maintenanceInterval: MaintenanceInterval,
		public recommandations: string | null = null,
		public cost: number | null = null,
	) {}
}
