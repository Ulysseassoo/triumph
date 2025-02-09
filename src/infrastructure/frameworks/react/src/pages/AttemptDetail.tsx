import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import AttemptInformations, { AttemptFormValues } from "@/components/attempt/AttemptInformations";
import { Attempt } from "@/interfaces/AttemptInterface";
import { Driver } from "@/interfaces/DriverInterface";
import { Moto } from "@/interfaces/MotoInterface";
import { getAttemptById, updateAttempt } from "@/services/AttemptServices";
import { getDrivers } from "@/services/DriverServices";
import { getMotos } from "@/services/MotoServices";

const AttemptDetails = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const [attempt, setAttempt] = useState<Attempt | null>(null);
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [motos, setMotos] = useState<Moto[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) return;
                const attempt = await getAttemptById(id);
                const motos = await getMotos();
                const drivers = await getDrivers();
                setAttempt(attempt);
                setDrivers(drivers);
                setMotos(motos);
            } catch (error) {
                console.error(`Error fetching attempt with id ${id}:`, error);
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "Impossible de charger la tentative",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, toast]);

    const handleUpdateUser = useCallback(async (data: AttemptFormValues) => {
        try {
            if (!attempt?.id) {
                toast({
                    variant: "destructive",
                    title: "Erreur",
                    description: "ID de l'essai manquant",
                });
                return;
            }
            await updateAttempt({
                ...data,
                id: attempt.id,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                driver: drivers.filter(driver => driver.id === data.driver)[0],
                moto: motos.filter(moto => moto.id === data.moto)[0],
            })
            setAttempt({
                ...attempt,
                ...data,
                driver: drivers.filter(driver => driver.id === data.driver)[0],
                moto: motos.filter(moto => moto.id === data.moto)[0],
            });
        } catch (error) {
            console.error(`Error updating attempt with id ${id}:`, error);
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de mettre à jour la tentative",
            });
        }
    }, [attempt, id, toast]);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!attempt) {
        return (
            <DashboardLayout>
                <div className="text-red-500">Tentative introuvable</div>
            </DashboardLayout>
        )
    }

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Détails de l'essai
                    </h1>
                </div>
                <AttemptInformations drivers={drivers} motos={motos} attempt={attempt} onUpdate={handleUpdateUser} />
            </div>
        </DashboardLayout>
    );
};

export default AttemptDetails;
