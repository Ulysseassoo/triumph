
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BreakdownForm } from "./BreakdownForm";
import { CollaborationBoard } from "./CollaborationBoard";
import { CorrectiveActionsTimeline } from "./CorrectiveActionsTimeline";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/Card";

export const BreakdownStepper = () => {
  const [currentStep, setCurrentStep] = useState("signalement");

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <h2 className="text-xl font-semibold">Gestion des Pannes</h2>
      </div>

      <Tabs value={currentStep} onValueChange={setCurrentStep} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="signalement">Signalement</TabsTrigger>
          <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
          <TabsTrigger value="resolution">Résolution</TabsTrigger>
        </TabsList>
        <TabsContent value="signalement" className="mt-6">
          <BreakdownForm onSuccess={() => setCurrentStep("diagnostic")} />
        </TabsContent>
        <TabsContent value="diagnostic" className="mt-6">
          <CollaborationBoard onSuccess={() => setCurrentStep("resolution")} />
        </TabsContent>
        <TabsContent value="resolution" className="mt-6">
          <CorrectiveActionsTimeline />
        </TabsContent>
      </Tabs>
    </Card>
  );
};