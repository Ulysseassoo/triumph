import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addDriver, Driver } from "@/lib/apiEntities";
import { Button } from "../ui/Button";

export const driverFormSchema = z.object({
  firstname: z.string().min(1, "Prénom requis"),
  lastname: z.string().min(1, "Nom de famille requis"),
  birthdate: z.string().min(1, "Date de naissance requise"),
  addresse: z.string().min(1, "Adresse requise"),
});
interface AddDriverDialogProps {
  children: React.ReactNode;
  onDriverAdded: (driver: Driver) => void;
}

type FormValues = {
  firstname: string;
  lastname: string;
  birthdate: string;
  addresse: string
};

export const AddDriverDialog = ({ children, onDriverAdded }: AddDriverDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      birthdate: new Date().toISOString().split("T")[0],
      addresse: ""
    },
  });
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const driver = await addDriver({
        firstname: values.firstname,
        lastname: values.lastname,
        birthdate: new Date(values.birthdate),
        addresse: values.addresse
      });
      onDriverAdded(driver);
      toast({
        title: "Conducteur ajouté",
        description: "Le conducteur a été ajoutée avec succès.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le conducteur. Veuillez réessayer.",
      });
      console.error(error)
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un conducteur</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau conducteur pour une moto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Amin" {...field} />
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
                    <Input placeholder="Ex: Nairi" {...field} />
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
                    <Input placeholder="Ex: Adresse d'Amine" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Ajouter le conducteur
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};