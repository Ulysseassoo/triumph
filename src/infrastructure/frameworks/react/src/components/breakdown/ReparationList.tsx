
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { getRepairs, createRepair } from "@/lib/apiEntities";
import { CorrectiveActions } from "./CorrectiveActions";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

interface ReparationListProps {
  breakdownId?: string;
}

export const ReparationList = ({ breakdownId }: ReparationListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: repairs } = useQuery({
    queryKey: ["repairs", breakdownId],
    queryFn: () => breakdownId ? getRepairs(breakdownId) : Promise.resolve([]),
    enabled: !!breakdownId,
  });

  const createRepairMutation = useMutation({
    mutationFn: (data: { description: string; cost: number; date: string }) =>
      breakdownId ? createRepair({
        ...data,
        breakdownId
      }) : Promise.reject("No breakdown ID"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repairs", breakdownId] });
      setIsOpen(false);
      toast.success("Réparation ajoutée");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout de la réparation");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createRepairMutation.mutate({
      description: formData.get("description") as string,
      cost: Number(formData.get("cost")),
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouvelle réparation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une réparation</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Description de la réparation"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cost">Coût</Label>
                <Input
                  id="cost"
                  name="cost"
                  type="number"
                  placeholder="Coût de la réparation"
                  required
                />
              </div>
              <Button type="submit">Ajouter</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {repairs?.map((repair) => (
        <Card key={repair.id} className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium">
                Réparation du {new Date(repair.date).toLocaleDateString()}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Coût</p>
                  <p className="mt-1">{repair.cost}€</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="mt-1">{repair.description}</p>
                </div>
              </div>
            </div>
            
            <CorrectiveActions repairId={repair.id} />
          </div>
        </Card>
      ))}
    </div>
  );
};
