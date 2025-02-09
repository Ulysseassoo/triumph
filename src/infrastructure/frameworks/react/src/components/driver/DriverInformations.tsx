import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";
import { useToast } from "@/components/ui/use-toast";
import { Driver } from "@/interfaces/DriverInterface";

export const formSchema = z.object({
    firstname: z.string().min(1, "Prénom requis"),
    lastname: z.string().min(1, "Nom de famille requis"),
    birthdate: z.string().min(1, "Date de naissance requise"),
    addresse: z.string().min(1, "Adresse requise"),
});

export type DriverFormValues = {
    firstname: string;
    lastname: string;
    birthdate: string;
    addresse: string;
};

const DriverForm = ({ driver, onUpdate }: { driver: Driver; onUpdate: (data: DriverFormValues) => void }) => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<DriverFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: driver.firstname,
            lastname: driver.lastname,
            birthdate: driver.birthdate.toString().split("T")[0],
            addresse: driver.addresse,
        },
    });

    const onSubmit = async (values: DriverFormValues) => {
        try {
            setIsSubmitting(true);
            onUpdate(values);
            toast({
                title: "Modifications enregistrées",
                description: "Les informations du conducteur ont été mises à jour.",
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
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de famille</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="birthdate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date de naissance</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="addresse"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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

export default DriverForm;
