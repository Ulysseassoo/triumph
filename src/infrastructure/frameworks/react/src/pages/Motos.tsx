import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Plus, Trash, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import MotoForm from "@/components/moto/MotoForm";
import { getLastPlannedMaintenanceDate } from "@/utils/maintenanceUtils";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getMotos } from "@/services/MotoServices";

interface Motorcycle {
  id: string;
  model: string;
  mileage: number;
  lastMaintenance: string;
}

const Motorcycles = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMoto, setSelectedMoto] = useState<Motorcycle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: motorcycles, isLoading } = useQuery({
    queryKey: ["motorcycles"],
    queryFn: async () => getMotos(),
  });

  const createMoto = useMutation({
    mutationFn: (data: Omit<Motorcycle, "id">) =>
      axios.post("/api/motos", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorcycles"] });
      toast({
        title: "Succès",
        description: "La moto a été créée avec succès",
      });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la moto",
        variant: "destructive",
      });
    },
  });

  const updateMoto = useMutation({
    mutationFn: (data: Motorcycle) => axios.put(`/api/motos/${data.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorcycles"] });
      toast({
        title: "Succès",
        description: "La moto a été mise à jour avec succès",
      });
      setIsDialogOpen(false);
      setSelectedMoto(null);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la mise à jour de la moto",
        variant: "destructive",
      });
    },
  });

  const deleteMoto = useMutation({
    mutationFn: (id: string) => axios.delete(`/api/motos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["motorcycles"] });
      toast({
        title: "Succès",
        description: "La moto a été supprimée avec succès",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la suppression de la moto",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (values: Omit<Motorcycle, "id">) => {
    if (selectedMoto) {
      updateMoto.mutate({ ...values, id: selectedMoto.id });
    } else {
      createMoto.mutate(values);
    }
  };

  const handleEdit = (moto: Motorcycle) => {
    setSelectedMoto(moto);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Motos</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setSelectedMoto(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une moto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {selectedMoto ? "Modifier la moto" : "Nouvelle moto"}
                </DialogTitle>
              </DialogHeader>
              <MotoForm
                onSubmit={handleSubmit}
                isSubmitting={createMoto.isPending || updateMoto.isPending}
                defaultValues={selectedMoto || undefined}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Modèle</TableHead>
                <TableHead>Kilométrage</TableHead>
                <TableHead>Dernier entretien</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {motorcycles &&
                motorcycles.map((moto) => (
                  <TableRow key={moto.id}>
                    <TableCell>{moto.id}</TableCell>
                    <TableCell>{moto.model}</TableCell>
                    <TableCell>{moto.currentMileage} km</TableCell>
                    <TableCell>
                      {" "}
                      {moto.maintenances && moto.maintenances.length > 0
                        ? getLastPlannedMaintenanceDate(
                          moto.maintenances
                        )?.toLocaleDateString() || "-"
                        : "-"}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/motos/${moto.id}`}>
                          Voir plus
                        </Link>
                      </Button>
                      {isAdmin && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(moto)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMoto.mutate(moto.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </>
                      )}
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

export default Motorcycles;
