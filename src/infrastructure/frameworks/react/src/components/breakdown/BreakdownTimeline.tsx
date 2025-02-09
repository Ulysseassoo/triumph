
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
      <div className="relative space-y-0">
        {repairs?.map((repair) => (
          <div 
            key={repair.id} 
            className="relative pl-6 pb-8 border-l-2 border-gray-200 last:border-l-0 last:pb-0"
          >
            <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-[#F6AD55] ring-4 ring-white" />
            <div className="mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                {new Date(repair.date).toLocaleDateString()}
              </p>
              <p className="mt-1 text-base">Réparation effectuée - {repair.description}</p>
            </div>
          </div>
        ))}
        {breakdown && (
          <div className="relative pl-6 pb-0 border-l-2 border-gray-200 last:border-l-0">
            <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-[#A0AEC0] ring-4 ring-white" />
            <div className="mb-2">
              <p className="text-sm font-medium text-muted-foreground">
                {new Date(breakdown.date).toLocaleDateString()}
              </p>
              <p className="mt-1 text-base">Panne signalée - {breakdown.description}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

