import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { MaintenanceCard } from "@/components/dashboard/MaintenanceCard";
import { MotoTable } from "@/components/dashboard/MotoTable";
import {
  getMaintenances,
  getMotos,
  type Maintenance,
  type Moto,
} from "@/lib/apiEntities";
import { Bike, Wrench, AlertTriangle } from "lucide-react";
import {
  getOverdueMaintenances,
  getPendingMaintenances,
} from "@/utils/maintenanceUtils";

const Dashboard = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [motos, setMotos] = useState<Moto[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [maintenancesData, motosData] = await Promise.all([
          getMaintenances(),
          getMotos(),
        ]);
        setMaintenances(maintenancesData);
        setMotos(motosData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } 
    };

    fetchData();
  }, []);

  const overdueMaintenances = getOverdueMaintenances(maintenances).length;
  const pendingMaintenances = getPendingMaintenances(maintenances).length;

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenue sur votre espace de gestion
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Total Motos"
            value={motos.length}
            icon={<Bike className="h-4 w-4" />}
          />
          <StatCard
            title="Entretiens en attente"
            value={pendingMaintenances}
            icon={<Wrench className="h-4 w-4" />}
          />
          <StatCard
            title="Entretiens en retard"
            value={overdueMaintenances}
            icon={<AlertTriangle className="h-4 w-4" />}
            description={overdueMaintenances > 0 ? "Action requise" : undefined}
            className={overdueMaintenances > 0 ? "border-red-500" : undefined}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Derniers entretiens</h2>
            <div className="grid gap-4">
              {maintenances.slice(0, 3).map((maintenance) => (
                <MaintenanceCard
                  key={maintenance.id}
                  maintenance={maintenance}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Motos</h2>
            <MotoTable motos={motos} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
