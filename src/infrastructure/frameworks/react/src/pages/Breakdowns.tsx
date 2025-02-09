import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BreakdownTable } from "@/components/breakdown/BreakdownTable";
import { Breakdown } from "@/interfaces/BreakdownInterface";
import { getBreakdowns } from "@/services/BreakdownServices";

const Breakdowns = () => {
  const [breakdowns, setBreakdowns] = useState<Breakdown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBreakdowns();
        setBreakdowns(data);
      } catch (error) {
        console.error("Error fetching breakdowns:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded-md"></div>
          <div className="h-8 bg-gray-200 rounded-md"></div>
          <div className="h-8 bg-gray-200 rounded-md"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestion des Pannes
          </h1>
          <p className="text-muted-foreground mt-2">
            Suivi des pannes et actions correctives
          </p>
        </div>
        <BreakdownTable breakdowns={breakdowns} />
      </div>
    </DashboardLayout>
  );
};
export default Breakdowns;