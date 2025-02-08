import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "react-day-picker";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/Form";
const formSchema = z.object({
  motoId: z.string().min(1, "Veuillez sélectionner une moto"),
  plannedDate: z.string().min(1, "Veuillez sélectionner une date"),
});
interface MaintenanceFormProps {
  onSubmit: (values: any) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}
const MaintenanceForm = ({ onSubmit, isSubmitting, defaultValues }: MaintenanceFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motoId: "",
      plannedDate: "",
      ...defaultValues,
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
          name="plannedDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date planifiée</FormLabel>
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
export default MaintenanceForm;