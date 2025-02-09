import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Button } from "./ui/Button";
import { getUserNotifications } from "@/lib/apiEntities";
import { useAuth } from "@/context/AuthContext";

const NotificationsPopover = () => {
  const { user } = useAuth();
  const { data: notifications, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => getUserNotifications(user?.id),
  });
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 600000);
    return () => clearInterval(interval);
  }, [refetch]);
  const unreadCount = notifications?.filter((notificqtion) => !notificqtion.isRead).length || 0;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative absolute right-8">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Notifications</h4>
          <div className="space-y-2">
            {notifications?.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucune notification
              </p>
            ) : (
              notifications?.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg ${
                    notification.isRead ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  <p className="text-sm">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.date).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default NotificationsPopover;
