import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { getMaintenanceById } from "@/lib/apiEntities";

const MaintenanceDetails = () => {
  const { id } = useParams();
  const { data: maintenance } = useQuery({
    queryKey: ["maintenance", id],
    queryFn: async () => getMaintenanceById(id),
  });

  if (!maintenance) {
    return <div>Maintenance non trouvée</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Maintenance ID: {maintenance.id}</CardTitle>
              <CardDescription>Moto ID: {maintenance.motoId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Kilométrage actuel</p>
                  <p className="text-2xl font-bold">{maintenance.mileage} km</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Type d'entretien</p>
                  <p className="text-2xl font-bold">{maintenance.maintenanceType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date planifiée</p>
                  <p className="text-2xl font-bold">{new Date(maintenance.plannedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date de réalisation</p>
                  <p className="text-2xl font-bold">
                    {maintenance.achievedDate ? new Date(maintenance.achievedDate).toLocaleDateString() : "Non réalisé"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Intervalle de maintenance</p>
                  <p className="text-2xl font-bold">
                    {maintenance.maintenanceInterval.mileage} km / {maintenance.maintenanceInterval.timeInMonths} mois
                  </p>
                </div>
                {maintenance.recommandations && (
                  <div>
                    <p className="text-sm font-medium">Recommandations</p>
                    <p className="text-2xl font-bold">{maintenance.recommandations}</p>
                  </div>
                )}
                {maintenance.cost && (
                  <div>
                    <p className="text-sm font-medium">Coût</p>
                    <p className="text-2xl font-bold">{maintenance.cost}€</p>
                  </div>
                )}
                {maintenance.pieces && maintenance.pieces.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-sm font-medium">Pièces remplacées</p>
                    <ul className="list-disc list-inside">
                      {maintenance.pieces.map((piece, index) => (
                        <li key={index} className="text-2xl font-bold">
                          {piece.name} (x{piece.quantity})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MaintenanceDetails;