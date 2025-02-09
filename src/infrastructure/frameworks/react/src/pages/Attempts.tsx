import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AddAttemptDialog } from "@/components/attempt/AddAttemptDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AttemptTable } from "@/components/attempt/AttemptTable";
import { Attempt } from "@/interfaces/AttemptInterface";
import { Driver } from "@/interfaces/DriverInterface";
import { Moto } from "@/interfaces/MotoInterface";
import { getAttempts } from "@/services/AttemptServices";
import { getDrivers } from "@/services/DriverServices";
import { getMotos } from "@/services/MotoServices";

const Attempts = () => {
    const [attempts, setAttempts] = useState<Attempt[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([])
    const [motos, setMotos] = useState<Moto[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAttempts();
                const drivers = await getDrivers();
                const motos = await getMotos();
                setAttempts(data);
                setDrivers(drivers)
                setMotos(motos)
            } catch (error) {
                console.error("Error fetching data:", error);
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
                    <AddAttemptDialog onAttemptAdded={handleAttemptAdded} drivers={drivers} motos={motos}>
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
