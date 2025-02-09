
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
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
import { createOrder } from "@/services/OrderServices";

interface CreateOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateOrderDialog = ({ open, onOpenChange }: CreateOrderDialogProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      totalAmount: Number(formData.get("totalAmount")),
      status: formData.get("status") as "EN_ATTENTE" | "CONFIRMEE" | "LIVREE",
      orderDate: moment(new Date(formData.get("orderDate") as string), "yyyy-MM-dd").format("YYYY-MM-DD"),
      deliveryDate: moment(new Date(formData.get("deliveryDate") as string), "yyyy-MM-DD").format("YYYY-MM-DD"),
      pieces: [],
    };

    try {
      await createOrder(data);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Commande créée",
        description: "La commande a été créée avec succès.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de la commande.",
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
          <DialogTitle>Nouvelle commande</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="totalAmount">Montant total</Label>
            <Input
              id="totalAmount"
              name="totalAmount"
              type="number"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select name="status" required defaultValue="EN_ATTENTE">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EN_ATTENTE">En attente</SelectItem>
                <SelectItem value="CONFIRMEE">Confirmée</SelectItem>
                <SelectItem value="LIVREE">Livrée</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderDate">Date de commande</Label>
            <Input
              id="orderDate"
              name="orderDate"
              type="date"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryDate">Date de livraison</Label>
            <Input
              id="deliveryDate"
              name="deliveryDate"
              type="date"
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
