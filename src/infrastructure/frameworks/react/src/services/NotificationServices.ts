import apiEntities from ".";
import { Notification } from "@/interfaces/NotificationInterface";

export const getUserNotifications = async (userId?: string) => {
  const response = await apiEntities.get<Notification[]>(
    "/notifications/user/" + userId
  );
  return response.data;
};
