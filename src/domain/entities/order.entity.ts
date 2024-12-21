export class Order {
    public constructor (
        public readonly id: string,
        public readonly pieces: object[],
        public readonly orderDate: string,
        public readonly deliveryDate: string,
        public readonly status: string,
        public readonly totalAmount: number,
    ) {}
}
