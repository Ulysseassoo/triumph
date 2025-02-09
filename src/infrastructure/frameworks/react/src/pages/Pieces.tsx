
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreatePieceDialog } from "@/components/piece/CreatePieceDialog";
import { useToast } from "@/hooks/use-toast";
import { deletePiece, getPieces } from "@/services/PieceServices";

const Pieces = () => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const { data: pieces = [], refetch } = useQuery({
    queryKey: ["pieces"],
    queryFn: getPieces,
  });

  const handleDelete = async (id: string) => {
    try {
      await deletePiece(id);
      refetch();
      toast({
        title: "Pièce supprimée",
        description: "La pièce a été supprimée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la pièce.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pièces détachées</h1>
          <p className="text-muted-foreground mt-2">
            Gérez votre inventaire de pièces détachées
          </p>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Liste des pièces</CardTitle>
            <Button onClick={() => setShowCreateDialog(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une pièce
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Coût</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Seuil d'alerte</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pieces.map((piece) => (
                  <TableRow key={piece.id}>
                    <TableCell>{piece.name}</TableCell>
                    <TableCell>{piece.type}</TableCell>
                    <TableCell>{piece.cost}€</TableCell>
                    <TableCell>{piece.quantity}</TableCell>
                    <TableCell>{piece.alertLimit}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                          onClick={() => handleDelete(piece.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <CreatePieceDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </DashboardLayout>
  );
};

export default Pieces;
