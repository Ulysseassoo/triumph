import { Maintenance } from "./maintenance.entity"

export enum MotoStatus {
	InService = "En service",
	Broken = "En panne",
	UnderMaintenance = "En maintenance",
}

export class Moto {
	constructor(
		public readonly id: string,
		public readonly model: string,
		public readonly clientId: string,
		public currentMileage: number,
		public price: number,
		public status: MotoStatus,
		public maintenances: Maintenance[] = []
	) {}

	isEligibleForMaintenance(intervalMileage: number, intervalTime: number): boolean {
		const lastMaintenance = this.getLastMaintenance()
		if (!lastMaintenance) return true

		const distanceSinceLastMaintenance = this.currentMileage - lastMaintenance.mileage
		const timeSinceLastMaintenance = lastMaintenance.achievedDate ? this.calculateTimeInMonth(lastMaintenance.achievedDate) : 0
		return distanceSinceLastMaintenance >= intervalMileage || timeSinceLastMaintenance >= intervalTime
	}

	private getLastMaintenance(): Maintenance | undefined {
		return this.maintenances.sort((a, b) => {
			if (!a.achievedDate || !b.achievedDate) return 0;
			return b.achievedDate.getTime() - a.achievedDate.getTime();
		})[0]
	}

	private calculateTimeInMonth(date: Date): number {
		const maintenant = new Date()
		return Math.ceil((maintenant.getTime() - date.getTime()) / (1000 * 3600 * 24 * 30))
	}
}
