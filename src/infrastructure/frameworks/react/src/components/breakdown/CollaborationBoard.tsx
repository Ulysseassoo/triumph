import { Card } from "../ui/Card";

interface CollaborationBoardProps {
  onSuccess: () => void;
}

export const CollaborationBoard = ({ onSuccess }: CollaborationBoardProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Diagnostic en cours</h3>
      <p className="text-muted-foreground">
        Un technicien analysera votre signalement et vous contactera prochainement.
      </p>
    </Card>
  );
};