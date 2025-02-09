import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CrashStatus, Crash } from "@/interfaces/CrashInterface";
import { Driver } from "@/interfaces/DriverInterface";
import { Moto } from "@/interfaces/MotoInterface";

export const formSchema = z.object({
    type: z.string().min(1, "Type requis"),
    date: z.string().min(1, "Date de l'accident requise"),
    description: z.string().min(1, "Description requise"),
    location: z.string().min(1, "Location requis"),
    responsability: z.string().min(1, "Responsabilité requise"),
    consequence: z.string().min(1, "Conséquence requise"),
    driver: z.string().min(1, "Conducteur requis"),
    moto: z.string().min(1, "Moto requise"),
});

export type CrashFormValues = {
    type: string;
    date: string;
    description: string;
    location: string;
    responsability: string;
    consequence: string;
    status: CrashStatus;
    driver: string;
    moto: string;
};

const CrashForm = ({ crash, onUpdate, drivers, motos }: { crash: Crash; onUpdate: (data: CrashFormValues) => void, motos: Moto[], drivers: Driver[] }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const driverOptions = useMemo(() => {
        return drivers.map((driver) => ({ id: driver.id, name: `${driver.firstname} ${driver.lastname}`, value: driver.id }))
    }, [drivers]);

    const motoOptions = useMemo(() => {
        return motos.map((moto) => ({ id: moto.id, name: `${moto.id} ${moto.model}`, value: moto.id }))
    }, [motos]);

    const form = useForm<CrashFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: crash.type,
            date: crash.date.toString().split("T")[0],
            description: crash.description,
            location: crash.location,
            status: crash.status,
            responsability: crash.responsability,
            consequence: crash.consequence,
            driver: crash.driver.id,
            moto: crash.moto.id
        },
    });

    const onSubmit = async (values: CrashFormValues) => {
        try {
            setIsSubmitting(true);
            onUpdate(values);
            toast({
                title: "Modifications enregistrées",
                description: "Les informations du crash ont été mises à jour.",
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
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type d'accident</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de l'accident</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="responsability"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Responsabilité</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="consequence"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Conséquence</FormLabel>
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
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir une moto" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {Object.values(CrashStatus).map((status) => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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
                                <FormLabel>Moto</FormLabel>
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

export default CrashForm;
