
import { useQuery } from "@tanstack/react-query";
import { getBreakdownById, getRepairs } from "@/lib/apiEntities";
import { Card } from "../ui/Card";

interface BreakdownTimelineProps {
  breakdownId?: string;
}

export const BreakdownTimeline = ({ breakdownId }: BreakdownTimelineProps) => {
  const { data: breakdown } = useQuery({
    queryKey: ["breakdowns", breakdownId],
    queryFn: () => getBreakdownById(breakdownId),
    enabled: !!breakdownId,
  });

  const { data: repairs } = useQuery({
    queryKey: ["repairs", breakdownId],
    queryFn: () => breakdownId ? getRepairs(breakdownId) : Promise.resolve([]),
    enabled: !!breakdownId,
  });

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Historique de la panne</h3>
      <div className="space-y-4">
        {repairs?.map((repair) => (
          <div key={repair.id} className="relative pl-6 pb-4 border-l-2 border-gray-200">
            <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-[#F6AD55]" />
            <p className="text-sm text-muted-foreground">
              {new Date(repair.date).toLocaleDateString()}
            </p>
            <p className="mt-1">Réparation effectuée - {repair.description}</p>
          </div>
        ))}
        {breakdown && (
          <div className="relative pl-6 pb-4 border-l-2 border-gray-200">
            <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-[#A0AEC0]" />
            <p className="text-sm text-muted-foreground">
              {new Date(breakdown.date).toLocaleDateString()}
            </p>
            <p className="mt-1">Panne signalée - {breakdown.description}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

