import { Order } from "@/interfaces/OrderInterface";
import apiEntities from ".";

export const getOrders = async () => {
    const response = await apiEntities.get<Order[]>("/orders");
    return response.data;
  };
  
  export const createOrder = async (data: Omit<Order, "id">) => {
    const response = await apiEntities.post<Order>("/orders", data);
    return response.data;
  };
  
