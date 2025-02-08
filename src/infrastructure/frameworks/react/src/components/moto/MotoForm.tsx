import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
const formSchema = z.object({
  model: z.string().min(1, "Le modèle est requis"),
  mileage: z.number().min(0, "Le kilométrage ne peut pas être négatif"),
  lastMaintenance: z.string().min(1, "La date du dernier entretien est requise"),
});
interface MotorcycleFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}
const MotorcycleForm = ({ onSubmit, isSubmitting, defaultValues }: MotorcycleFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      model: "",
      mileage: 0,
      lastMaintenance: new Date().toISOString().split('T')[0],
      ...defaultValues,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modèle</FormLabel>
              <FormControl>
                <Input placeholder="Modèle de la moto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilométrage</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="Kilométrage" 
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastMaintenance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dernier entretien</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
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
export default MotorcycleForm;