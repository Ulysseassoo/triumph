
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BreakdownInfo } from "@/components/breakdown/BreakdownInfo";
import { ReparationList } from "@/components/breakdown/ReparationList";
import { BreakdownTimeline } from "@/components/breakdown/BreakdownTimeline";

const BreakdownDetails = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Détails de la panne
          </h1>
          <p className="text-muted-foreground mt-2">
            Suivi des réparations et actions correctives
          </p>
        </div>

        <BreakdownInfo breakdownId={id} />

        <Tabs defaultValue="repairs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="repairs">Réparations</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>
          <TabsContent value="repairs">
            <ReparationList breakdownId={id} />
          </TabsContent>
          <TabsContent value="history">
            <BreakdownTimeline breakdownId={id} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BreakdownDetails;
