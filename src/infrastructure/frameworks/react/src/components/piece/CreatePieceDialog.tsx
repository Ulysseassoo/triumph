
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/Button";
import { createPiece } from "@/services/PieceServices";

interface CreatePieceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreatePieceDialog = ({ open, onOpenChange }: CreatePieceDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      type: formData.get("type") as "FILTRE" | "FREIN" | "MOTEUR" | "ROUE",
      cost: Number(formData.get("cost")),
      quantity: Number(formData.get("quantity")),
      alertLimit: Number(formData.get("alertLimit")),
    };

    try {
      await createPiece(data);
      queryClient.invalidateQueries({ queryKey: ["pieces"] });
      toast({
        title: "Pièce créée",
        description: "La pièce a été créée avec succès.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la pièce.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une pièce</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space

-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select name="type" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FILTRE">Filtre</SelectItem>
                <SelectItem value="FREIN">Frein</SelectItem>
                <SelectItem value="MOTEUR">Moteur</SelectItem>
                <SelectItem value="ROUE">Roue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Coût</Label>
            <Input
              id="cost"
              name="cost"
              type="number"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantité</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="alertLimit">Seuil d'alerte</Label>
            <Input
              id="alertLimit"
              name="alertLimit"
              type="number"
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Création..." : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
