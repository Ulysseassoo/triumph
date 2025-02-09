import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Attempt, Driver, Moto } from "@/lib/apiEntities";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const formSchema = z.object({
    startDate: z.string().min(1, "Date de début requis"),
    endDate: z.string().min(1, "Date de fin requis"),
    startKilometer: z.string().min(1, "Kilométrage de départ requis"),
    endKilometer: z.string().min(1, "Kilométrage de fin requis"),
    status: z.string().min(1, "Statut requise"),
    driver: z.string().min(1, "Conducteur requis"),
    moto: z.string().min(1, "Moto requise"),
});

export type AttemptFormValues = {
    startDate: string,
    endDate: string,
    startKilometer: string,
    endKilometer: string,
    status: string,
    driver: string,
    moto: string
};

const AttemptForm = ({ attempt, onUpdate, drivers, motos }: { attempt: Attempt; onUpdate: (data: AttemptFormValues) => void, motos: Moto[], drivers: Driver[] }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const driverOptions = useMemo(() => {
        return drivers.map((driver) => ({ id: driver.id, name: `${driver.firstname} ${driver.lastname}`, value: driver.id }))
    }, [drivers])
    const motoOptions = useMemo(() => {
        return motos.map((moto) => ({ id: moto.id, name: `${moto.id} ${moto.model}`, value: moto.id }))
    }, [motos])

    const form = useForm<AttemptFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startDate: attempt.startDate.toString().split("T")[0],
            endDate: attempt.endDate.toString().split("T")[0],
            startKilometer: attempt.startKilometer.toString(),
            endKilometer: attempt.endKilometer.toString(),
            status: attempt.status,
            driver: attempt.driver.id,
            moto: attempt.moto.id
        },
    });

    const onSubmit = async (values: AttemptFormValues) => {
        try {
            setIsSubmitting(true);
            onUpdate(values);
            toast({
                title: "Modifications enregistrées",
                description: "Les informations de la tentative ont été mises à jour.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de mettre à jour les informations.",
            });
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="p-6">
            <h2 className="text-2xl font-semi tracking-tight mb-6">Modifier les informations</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de début</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de fin</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startKilometer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kilométrage de départ</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endKilometer"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kilométrage de fin</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Statut</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="driver"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Conducteur</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisir un conducteur" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    driverOptions.map((driver) => {
                                                        return <SelectItem key={driver.id} value={driver.value}>{driver.name}</SelectItem>
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="moto"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Conducteur</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisir une moto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    motoOptions.map((moto) => {
                                                        return <SelectItem key={moto.id} value={moto.value}>{moto.name}</SelectItem>
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                </form>
            </Form>
        </Card>
    );
};

export default AttemptForm;
