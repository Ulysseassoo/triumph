import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "react-day-picker";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/Form";
const formSchema = z.object({
  motoId: z.string().min(1, "Veuillez sélectionner une moto"),
  plannedDate: z.string().min(1, "Veuillez sélectionner une date"),
  status: z.enum(["DUE", "COMPLETED", "CANCELLED"]),
});
interface MaintenanceFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  isSubmitting?: boolean;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}
const MaintenanceForm = ({ onSubmit, isSubmitting, defaultValues }: MaintenanceFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motoId: "",
      plannedDate: "",
      status: "DUE",
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
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DUE">À faire</SelectItem>
                  <SelectItem value="COMPLETED">Terminé</SelectItem>
                  <SelectItem value="CANCELLED">Annulé</SelectItem>
                </SelectContent>
              </Select>
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