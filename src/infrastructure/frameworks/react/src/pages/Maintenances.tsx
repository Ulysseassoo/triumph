import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import MaintenanceForm from "@/components/maintenance/MaintenanceForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { getMaintenances, Maintenance } from "@/lib/apiEntities";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Maintenances = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMaintenance, setSelectedMaintenance] =
    useState<Maintenance | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: maintenances, isLoading } = useQuery({
    queryKey: ["maintenances"],
    queryFn: async () => getMaintenances(),
  });

  const createMaintenance = useMutation({
    mutationFn: (data: Omit<Maintenance, "id">) =>
      axios.post("/api/maintenances", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenances"] });
      toast({
        title: "Succès",
        description: "L'entretien a été créé avec succès",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la création de l'entretien",
        variant: "destructive",
      });
    },
  });

  const updateMaintenance = useMutation({
    mutationFn: (data: Maintenance) =>
      axios.put(`/api/maintenances/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenances"] });
      toast({
        title: "Succès",
        description: "L'entretien a été mis à jour avec succès",
      });
      setIsDialogOpen(false);
      setSelectedMaintenance(null);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la mise à jour de l'entretien",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (values: Maintenance) => {
    if (selectedMaintenance) {
      updateMaintenance.mutate({ ...values });
    } else {
      createMaintenance.mutate(values);
    }
  };

  const handleEdit = (maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <></>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Entretiens</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedMaintenance(null)}>
                Ajouter un entretien
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedMaintenance
                    ? "Modifier l'entretien"
                    : "Nouvel entretien"}
                </DialogTitle>
              </DialogHeader>
              <MaintenanceForm
                onSubmit={handleSubmit}
                isSubmitting={
                  createMaintenance.isPending || updateMaintenance.isPending
                }
                defaultValues={selectedMaintenance || undefined}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Moto</TableHead>
                <TableHead>Date planifiée</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenances?.map((maintenance) => (
                <TableRow key={maintenance.id}>
                  <TableCell>{maintenance.id}</TableCell>
                  <TableCell>{maintenance.motoId}</TableCell>
                  <TableCell>
                    {new Date(maintenance.plannedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{maintenance.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(maintenance)}
                    >
                      Éditer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Maintenances;
