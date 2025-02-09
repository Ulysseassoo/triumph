import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MaintenanceTimeline } from "@/components/maintenance/MaintenanceTimeline";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Maintenance } from "@/interfaces/MaintenanceInterface";
import { getMaintenanceHistory } from "@/services/MaintenanceServices";
import { getMotoById } from "@/services/MotoServices";

const MotoDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const { data: moto, isLoading } = useQuery({
    queryKey: ["moto", id],
    queryFn: async () => getMotoById(id),
  });

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
      }
    };

    fetchData();
  }, [id, toast]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!moto) {
    return <div>Moto non trouvée</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{moto.model}</CardTitle>
              <CardDescription>ID: {moto.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Kilométrage actuel</p>
                  <p className="text-2xl font-bold">{moto.currentMileage} km</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
