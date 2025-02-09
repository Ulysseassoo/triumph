export interface Order {
    id: string;
    totalAmount: number;
    status: "EN_ATTENTE" | "CONFIRMEE" | "LIVREE";
    orderDate: string;
    deliveryDate: string;
    pieces: Array<{ pieceId: string; quantity: number }>;
}