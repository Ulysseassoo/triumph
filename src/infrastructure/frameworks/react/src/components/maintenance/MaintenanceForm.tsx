import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/Form";
import { Button } from "../ui/Button";
import { Maintenance } from "@/interfaces/MaintenanceInterface";

const formSchema = z.object({
  motoId: z.string().min(1, "Veuillez sélectionner une moto"),
  kilometrageInterval: z.preprocess((val) => Number(val), z.number().min(1, "Veuillez entrer un kilométrage valide")),
  tempsInterval: z.preprocess((val) => Number(val), z.number().min(1, "Veuillez entrer un temps en mois valide")),
  recommandations: z.string().optional(),
});

interface MaintenanceFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isSubmitting?: boolean;
  defaultValues?: Maintenance;
}

const MaintenanceForm = ({ onSubmit, isSubmitting, defaultValues }: MaintenanceFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motoId: defaultValues?.motoId || "",
      kilometrageInterval: defaultValues?.maintenanceInterval.mileage || 0,
      tempsInterval: defaultValues?.maintenanceInterval.timeInMonths || 0,
      recommandations: defaultValues?.recommandations || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="motoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Moto</FormLabel>
              <FormControl>
                <Input placeholder="ID de la moto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kilometrageInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intervalle de kilométrage</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Kilométrage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tempsInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intervalle de temps (mois)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Temps en mois" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recommandations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recommandations</FormLabel>
              <FormControl>
                <Input placeholder="Recommandations" {...field} />
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
  );
};

export default MaintenanceForm;