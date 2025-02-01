export class Notification {
	constructor(
		public readonly id: string,
		public readonly userId: string,
		public readonly date: Date,
		public message: string,
		public isRead = false,
	) {}
}