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
import { Button } from "../ui/Button";
import { DriverExperience } from "@/interfaces/DriverExperienceInterface";
import { Driver } from "@/interfaces/DriverInterface";
import { addDriverExperience } from "@/services/DriverExperienceServices";

const formSchema = z.object({
  duration: z.string().min(1, "Prénom requis"),
  type: z.string().min(1, "Nom de famille requis"),
  rented: z.boolean(),
  professional: z.boolean(),
  feedback: z.string().min(1, "Adresse requise"),
});
interface AddDriverExperienceDialogProps {
  children: React.ReactNode;
  onDriverExperienceAdded: (driverExperience: DriverExperience) => void;
  driver: Driver
}

type FormValues = {
  duration: string;
  type: string;
  rented: boolean;
  professional: boolean
  feedback: string
};

export const AddDriverExperienceDialog = ({ children, onDriverExperienceAdded, driver }: AddDriverExperienceDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: "",
      type: "",
      rented: false,
      professional: false,
      feedback: ""
    },
  });
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const driverExperience = await addDriverExperience({
        duration: values.duration,
        type: values.type,
        rented: values.rented,
        professional: values.professional,
        feedback: values.feedback,
        driver
      });
      onDriverExperienceAdded(driverExperience);
      toast({
        title: "Expérience ajoutée",
        description: "L'expérience a été ajoutée avec succès.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter l'expérience. Veuillez réessayer.",
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
          <DialogTitle>Ajouter une expérience</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle expérience pour une moto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durée</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 5 mois" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Nairi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rented"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loué ?</FormLabel>
                  <FormControl>
                    <Input type="checkbox" checked={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="professional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professionnel ?</FormLabel>
                  <FormControl>
                    <Input type="checkbox" checked={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retour</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Nairi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Ajouter l'expérience
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
