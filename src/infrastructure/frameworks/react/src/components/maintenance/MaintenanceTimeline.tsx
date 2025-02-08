
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wrench, Calendar, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card } from "../ui/Card";
import { Maintenance, MaintenanceType } from "@/lib/apiEntities";

interface MaintenanceTimelineProps {
  maintenances: Maintenance[];
}

export const MaintenanceTimeline = ({ maintenances }: MaintenanceTimelineProps) => {
  const getStatusIcon = (status: Maintenance["status"]) => {
    switch (status) {
      case "COMPLETED":
        return <Wrench className="h-4 w-4 text-green-500" />;
      case "DUE":
        return <Calendar className="h-4 w-4 text-yellow-500" />;
      case "OVERDUE":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Historique des entretiens</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {maintenances.map((maintenance, index) => (
            <div key={maintenance.id}>
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(maintenance.status)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {maintenance.maintenanceType === MaintenanceType.PREVENTIF ? "Entretien préventif" : "Entretien correctif"}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(maintenance.plannedDate), "d MMMM yyyy", { locale: fr })}
                    </span>
                  </div>
                  {maintenance.pieces && maintenance.pieces.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Pièces remplacées :</p>
                      <ul className="text-sm list-disc list-inside">
                        {maintenance.pieces.map((piece, i) => (
                          <li key={i}>
                            {piece.name} (x{piece.quantity})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {maintenance.recommandations && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      Notes : {maintenance.recommandations}
                    </p>
                  )}
                  {maintenance.cost && (
                    <p className="mt-2 text-sm font-medium">
                      Coût : {maintenance.cost}€
                    </p>
                  )}
                </div>
              </div>
              {index < maintenances.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};