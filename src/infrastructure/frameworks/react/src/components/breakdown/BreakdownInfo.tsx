
import { useQuery } from "@tanstack/react-query";
import { getBreakdowns } from "@/lib/apiEntities";
import { Badge } from "lucide-react";
import { Card } from "../ui/Card";

interface BreakdownInfoProps {
  breakdownId?: string;
}

export const BreakdownInfo = ({ breakdownId }: BreakdownInfoProps) => {
  const { data: breakdown } = useQuery({
    queryKey: ["breakdowns", breakdownId],
    queryFn: () => getBreakdowns().then(breakdowns => 
      breakdowns.find(b => b.id === breakdownId)
    ),
    enabled: !!breakdownId,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-[#A0AEC0]";
      case "DIAGNOSED":
        return "bg-[#F6AD55]";
      case "RESOLVED":
        return "bg-[#48BB78]";
      default:
        return "bg-[#A0AEC0]";
    }
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Moto</p>
          <p className="mt-1 font-medium">{breakdown?.motoId || "---"}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Date</p>
          <p className="mt-1 font-medium">
            {breakdown ? new Date(breakdown.date).toLocaleDateString() : "---"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Statut</p>
          <Badge 
            className={`mt-1 ${breakdown ? getStatusColor(breakdown.status) : "bg-[#A0AEC0]"}`}
          >
            {breakdown?.status === "PENDING" && "En attente"}
            {breakdown?.status === "DIAGNOSED" && "En cours"}
            {breakdown?.status === "RESOLVED" && "Terminé"}
            {!breakdown && "---"}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

