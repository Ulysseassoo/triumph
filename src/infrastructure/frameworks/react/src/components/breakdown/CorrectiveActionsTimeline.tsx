import { Card } from "../ui/Card";

export const CorrectiveActionsTimeline = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Suivi des actions correctives</h3>
      <p className="text-muted-foreground">
        Les actions correctives seront affichées ici une fois le diagnostic effectué.
      </p>
    </Card>
  );
};