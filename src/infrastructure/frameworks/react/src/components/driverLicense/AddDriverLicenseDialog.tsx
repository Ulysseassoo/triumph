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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/Button";
import { Driver } from "@/interfaces/DriverInterface";
import { DriverLicense, DriverLicenseStatus } from "@/interfaces/DriverLicenseInterface";
import { addDriverLicense } from "@/services/DriverLicenseServices";

const formSchema = z.object({
  licenseNumber: z.string().min(1, "Numéro requis"),
  category: z.string().min(1, "Catégorie requis"),
  expiryDate: z.string().min(1, "Date d'expiration requise"),
  obtainDate: z.string().min(1, "Date d'obtention requise"),
  country: z.string().min(1, "Pays requis"),
  status: z.string().min(1, "Statut requis"),
});

interface AddDriverLicenseDialogProps {
  children: React.ReactNode;
  onDriverLicenseAdded: (driverLicense: DriverLicense) => void;
  driver: Driver
}

type FormValues = {
  licenseNumber: string,
  category: string,
  expiryDate: string,
  obtainDate: string,
  country: string,
  status: DriverLicenseStatus,
};

export const AddDriverLicenseDialog = ({
  children,
  onDriverLicenseAdded,
  driver
}: AddDriverLicenseDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      licenseNumber: "",
      category: "",
      expiryDate: new Date().toISOString().split("T")[0],
      obtainDate: new Date().toISOString().split("T")[0],
      country: "",
      status: DriverLicenseStatus.VALID,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const driverLicense = await addDriverLicense({
        licenseNumber: values.licenseNumber,
        category: values.category,
        expiryDate: new Date(values.expiryDate),
        obtainDate: new Date(values.obtainDate),
        country: values.country,
        status: values.status,
        driver
      });
      onDriverLicenseAdded(driverLicense);
      toast({
        title: "Permis de conduire ajouté",
        description: "Le permis de conduire a été ajouté avec succès.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter le permis de conduire. Veuillez réessayer.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un permis de conduire</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau permis de conduire
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de permis</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 54020 4 0240234 204 024 0423" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>category</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: A" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="obtainDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'obtention</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: France" {...field} />
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
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une moto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.values(DriverLicenseStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Ajouter le permis de conduire
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
