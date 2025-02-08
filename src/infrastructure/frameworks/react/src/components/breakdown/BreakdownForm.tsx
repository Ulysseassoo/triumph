
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { reportBreakdown } from "@/lib/apiEntities";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";
import { Button } from "../ui/Button";

const formSchema = z.object({
  motoId: z.string().min(1, "Veuillez sélectionner une moto"),
  description: z.string().min(10, "La description doit faire au moins 10 caractères"),
  warrantyId: z.string().optional(),
});

interface BreakdownFormProps {
  onSuccess: () => void;
}

export const BreakdownForm = ({ onSuccess }: BreakdownFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      warrantyId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      await reportBreakdown({
        motoId: values.motoId,
        description: values.description,
        warrantyId: values.warrantyId || undefined,
      });
      toast({
        title: "Panne signalée",
        description: "Un technicien va prendre en charge votre demande.",
      });
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de signaler la panne. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description de la panne</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Décrivez le problème rencontré..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="warrantyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de garantie (optionnel)</FormLabel>
              <FormControl>
                <Input placeholder="Ex: GAR-2024-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          Signaler la panne
        </Button>
      </form>
    </Form>
  );
};