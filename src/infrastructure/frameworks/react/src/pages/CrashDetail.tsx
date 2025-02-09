import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import CrashInformations, { CrashFormValues } from "@/components/crash/CrashInformations";
import { Crash } from "@/interfaces/CrashInterface";
import { Driver } from "@/interfaces/DriverInterface";
import { Moto } from "@/interfaces/MotoInterface";
import { getCrashById, updateCrash } from "@/services/CrashServices";
import { getDrivers } from "@/services/DriverServices";
import { getMotos } from "@/services/MotoServices";

const CrashDetails = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const [crash, setCrash] = useState<Crash | null>(null);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [motos, setMotos] = useState<Moto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;
                const crash = await getCrashById(id);
                const motos = await getMotos();
                const drivers = await getDrivers();
                setCrash(crash);
                setDrivers(drivers);
                setMotos(motos);
            } catch (error) {
                console.error(`Error fetching crash with id ${id}:`, error);
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "Impossible de charger l'accident",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, toast]);

    const handleUpdateUser = useCallback(async (data: CrashFormValues) => {
        try {
            if (!crash?.id) {
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "ID de l'accident manquant",
                });
                return;
            }
            await updateCrash({
                ...data,
                id: crash.id,
                driver: drivers.filter(driver => driver.id === data.driver)[0],
                moto: motos.filter(moto => moto.id === data.moto)[0],
            })
            setCrash({
                ...crash,
                ...data,
                driver: drivers.filter(driver => driver.id === data.driver)[0],
                moto: motos.filter(moto => moto.id === data.moto)[0],
            });
        } catch (error) {
            console.error(`Error updating crash with id ${id}:`, error);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de mettre à jour l'accident",
            });
        }
    }, [crash, id, toast]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!crash) {
        return (
            <DashboardLayout>
                <div className="text-red-500">Accident introuvable</div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Détails de l'accident
                    </h1>
                </div>
                <CrashInformations drivers={drivers} motos={motos} crash={crash} onUpdate={handleUpdateUser} />
            </div>
        </DashboardLayout>
    );
};

export default CrashDetails;
