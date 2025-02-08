import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AddAttemptDialog } from "@/components/attempt/AddAttemptDialog";
import { Attempt, getAttempts } from "@/lib/apiEntities";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AttemptTable } from "@/components/attempt/AttemptTable";

const Attempts = () => {
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAttempts();
                setAttempts(data);
            } catch (error) {
                console.error("Error fetching attempts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAttemptAdded = (newAttempt: Attempt) => {
        setAttempts((prev) => [...prev, newAttempt]);
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="animate-pulse space-y-8">
                    <div className="h-8 bg-gray-200 rounded-md"></div>
                    <div className="h-8 bg-gray-200 rounded-md"></div>
                    <div className="h-8 bg-gray-200 rounded-md"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Essais</h1>
                        <p className="text-muted-foreground mt-2">
                            Gestion des essais
                        </p>
                    </div>
                    <AddAttemptDialog onAttemptAdded={handleAttemptAdded}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter une essai
                        </Button>
                    </AddAttemptDialog>
                </div>
                <AttemptTable attempts={attempts} />
            </div>
        </DashboardLayout>
    );
};

export default Attempts;
