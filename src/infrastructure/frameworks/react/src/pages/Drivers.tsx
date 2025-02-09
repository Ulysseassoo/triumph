import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AddDriverDialog } from "@/components/driver/AddDriverDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DriverTable } from "@/components/driver/DriverTable";
import { Driver } from "@/interfaces/DriverInterface";
import { getDrivers } from "@/services/DriverServices";
const Drivers = () => {
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDrivers();
                setDrivers(data);
            } catch (error) {
                console.error("Error fetching drivers:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    const handleDriverAdded = (newDriver: Driver) => {
        setDrivers((prev) => [...prev, newDriver]);
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
                        <h1 className="text-3xl font-bold tracking-tight">Conducteurs</h1>
                        <p className="text-muted-foreground mt-2">
                            Gestion des conducteurs
                        </p>
                    </div>
                    <AddDriverDialog onDriverAdded={handleDriverAdded}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Ajouter un conducteur
                        </Button>
                    </AddDriverDialog>
                </div>
                <DriverTable drivers={drivers} />
            </div>
        </DashboardLayout>
    );
};
export default Drivers;
