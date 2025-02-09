
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCorrectiveActions, createCorrectiveAction } from "@/lib/apiEntities";
import { toast } from "sonner";
import { Button } from "../ui/Button";

interface CorrectiveActionsProps {
  repairId: string;
}

export const CorrectiveActions = ({ repairId }: CorrectiveActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: actions } = useQuery({
    queryKey: ["corrective-actions", repairId],
    queryFn: () => getCorrectiveActions(repairId),
  });

  const createActionMutation = useMutation({
    mutationFn: (data: { description: string; date: string }) =>
      createCorrectiveAction( {
        description: data.description,
        reparationId: repairId
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["corrective-actions", repairId] });
      setIsOpen(false);
      toast.success("Action corrective ajoutée");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout de l'action corrective");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createActionMutation.mutate({
      description: formData.get("description") as string,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Actions correctives</h4>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Nouvelle action
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une action corrective</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Description de l'action corrective"
                  required
                />
              </div>
              <Button type="submit">Ajouter</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {actions?.map((action) => (
          <div
            key={action.id}
            className="relative pl-6 pb-4 border-l-2 border-gray-200"
          >
            <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-green-400" />
            <p className="text-sm text-muted-foreground">
              {new Date(action.date).toLocaleDateString()}
            </p>
            <p className="mt-1">{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
