import { Maintenance } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface MaintenanceCardProps {
  maintenance: Maintenance;
}

export const MaintenanceCard = ({ maintenance }: MaintenanceCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DUE":
        return "bg-yellow-500";
      case "COMPLETED":
        return "bg-green-500";
      case "OVERDUE":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Maintenance #{maintenance.id}
        </CardTitle>
        <Badge className={getStatusColor(maintenance.status)}>
          {maintenance.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="text-xs text-muted-foreground">
            Moto ID: {maintenance.motoId}
          </div>
          <div className="text-xs text-muted-foreground">
            Date prévue: {new Date(maintenance.plannedDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};