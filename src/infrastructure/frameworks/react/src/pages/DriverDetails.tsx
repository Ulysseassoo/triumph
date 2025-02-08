
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Driver, getDriverById, updateDriver } from "@/lib/apiEntities";
import { useToast } from "@/hooks/use-toast";
import DriverInformations from "@/components/driver/DriverInformations";
import DriverExperienceCard from "@/components/driver/DriverExperienceCard";
import DriverLicenseCard from "@/components/driver/DriverLicenseCard";

const DriverDetails = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const [driver, setDriver] = useState<Driver | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;
                const driver = await getDriverById(id);
                setDriver(driver);
            } catch (error) {
                console.error(`Error fetching driver with id ${id}:`, error);
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "Impossible de charger le conducteur",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, toast]);


    const handleUpdateUser = useCallback(async (data: Driver) => {
        try {
            const newDriver = { ...driver, ...data }
            await updateDriver(newDriver)
            setDriver(newDriver);
        } catch (error) {
            console.error(`Error updating driver with id ${id}:`, error);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de mettre à jour le conducteur",
            });
        }
    }, [driver, id, toast])

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!driver) {
        return (
            <DashboardLayout>
                <div className="text-red-500">Conduteur introuvable</div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Détails du conducteur
                    </h1>
                </div>
                <DriverInformations driver={driver} onUpdate={handleUpdateUser} />
                <div className="grid gap-4 md:grid-cols-2">
                    <DriverExperienceCard driver={driver} />
                    <DriverLicenseCard driver={driver} />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DriverDetails;