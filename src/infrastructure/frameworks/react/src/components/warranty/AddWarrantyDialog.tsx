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
import { Warranty } from "@/interfaces/WarrantyInterface";
import { addWarranty } from "@/services/WarrantyServices";
const formSchema = z.object({
  motoId: z.string().min(1, "L'identifiant de la moto est requis"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
});
interface AddWarrantyDialogProps {
  children: React.ReactNode;
  onWarrantyAdded: (warranty: Warranty) => void;
}

type FormValues = {
  motoId: string;
  startDate: string;
  endDate: string;
};

export const AddWarrantyDialog = ({ children, onWarrantyAdded }: AddWarrantyDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motoId: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
    },
  });
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const warranty = await addWarranty({
        motoId: values.motoId,
        startDate: values.startDate,
        endDate: values.endDate,
      });
      onWarrantyAdded(warranty);
      toast({
        title: "Garantie ajoutée",
        description: "La garantie a été ajoutée avec succès.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter la garantie. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une garantie</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle garantie pour une moto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="motoId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Identifiant de la moto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: MOTO-2024-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit" disabled={isSubmitting}>
              Ajouter la garantie
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};