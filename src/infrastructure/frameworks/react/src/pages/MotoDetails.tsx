
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MaintenanceTimeline } from "@/components/maintenance/MaintenanceTimeline";
import { getMaintenanceHistory, Maintenance } from "@/lib/apiEntities";
import { useToast } from "@/hooks/use-toast";

const MotoDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;
        const maintenancesData = await getMaintenanceHistory(id);
        setMaintenances(maintenancesData);
      } catch (error) {
        console.error("Error fetching maintenance history:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger l'historique des entretiens",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Détails de la moto
          </h1>
          <p className="text-muted-foreground mt-2">
            Historique complet des entretiens
          </p>
        </div>

        <div className="space-y-6">
          <MaintenanceTimeline maintenances={maintenances ?? []} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MotoDetails;