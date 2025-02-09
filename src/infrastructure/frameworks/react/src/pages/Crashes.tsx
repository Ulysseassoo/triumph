import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AddCrashDialog } from "@/components/crash/AddCrashDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CrashTable } from "@/components/crash/CrashTable";
import { Crash } from "@/interfaces/CrashInterface";
import { Driver } from "@/interfaces/DriverInterface";
import { Moto } from "@/interfaces/MotoInterface";
import { getCrashes } from "@/services/CrashServices";
import { getDrivers } from "@/services/DriverServices";
import { getMotos } from "@/services/MotoServices";

const Crashes = () => {
    const [crashes, setCrashes] = useState<Crash[]>([]);
    const [drivers, setDrivers] = useState<Driver[]>([])
    const [motos, setMotos] = useState<Moto[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCrashes();
                const drivers = await getDrivers();
                const motos = await getMotos();
                setCrashes(data);
                setDrivers(drivers)
                setMotos(motos)
            } catch (error) {
                console.error("Error fetching crashes:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleCrashAdded = (newCrash: Crash) => {
        setCrashes((prev) => [...prev, newCrash]);
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
                        <h1 className="text-3xl font-bold tracking-tight">Accidents</h1>
                        <p className="text-muted-foreground mt-2">
                            Gestion des accidents
                        </p>
                    </div>
                    <AddCrashDialog onCrashAdded={handleCrashAdded} drivers={drivers} motos={motos}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter un accident
                        </Button>
                    </AddCrashDialog>
                </div>
                <CrashTable crashes={crashes} />
            </div>
        </DashboardLayout>
    );
};

export default Crashes;
