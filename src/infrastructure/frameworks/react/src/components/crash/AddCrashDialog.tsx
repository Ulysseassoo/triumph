import { useMemo, useState } from "react";
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
import { addCrash, Crash, Driver, Moto } from "@/lib/apiEntities";
import { Button } from "../ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  type: z.string().min(1, "Type d'accident requis"),
  date: z.string().min(1, "Date requise"),
  description: z.string().min(1, "Description requise"),
  location: z.string().min(1, "Lieu requis"),
  responsability: z.string().min(1, "Responsabilités requises"),
  consequence: z.string().min(1, "Conséquences requises"),
  status: z.string().min(1, "Statut requis"),
  driver: z.string().min(1, "Statut requis"),
  moto: z.string().min(1, "Statut requis"),
});

interface AddCrashDialogProps {
  children: React.ReactNode;
  onCrashAdded: (crash: Crash) => void;
  drivers: Driver[],
  motos: Moto[]
}

type FormValues = {
  type: string,
  date: string,
  description: string,
  location: string,
  responsability: string,
  consequence: string,
  status: string,
  driver: string;
  moto: string
};

export const AddCrashDialog = ({ children, onCrashAdded, drivers, motos }: AddCrashDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const driverOptions = useMemo(() => {
    return drivers.map((driver) => ({ id: driver.id, name: `${driver.firstname} ${driver.lastname}`, value: driver.id }))
  }, [drivers])
  const motoOptions = useMemo(() => {
    return motos.map((moto) => ({ id: moto.id, name: `${moto.id} ${moto.model}`, value: moto.id }))
  }, [motos])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      location: "",
      responsability: "",
      consequence: "",
      status: "",
      driver: "",
      moto: ""
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const crash = await addCrash({
        type: values.type,
        date: new Date(values.date),
        description: values.description,
        location: values.location,
        responsability: values.responsability,
        consequence: values.consequence,
        status: values.status,
        driver: drivers.filter(driver => driver.id === values.driver)[0],
        moto: motos.filter(moto => moto.id === values.moto)[0],
      });
      onCrashAdded(crash);
      toast({
        title: "Accident ajouté",
        description: "L'accident a été ajouté avec succès.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter l'accident. Veuillez réessayer.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un accident</DialogTitle>
          <DialogDescription>
            Ajoutez un nouvel accident pour une moto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type d'accident</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: collision" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de l'accident</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Le lieu</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rue accident" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description de l'accident</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Collision entre deux véhicules" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsable de l'accident</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Conducteur / Tiers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consequence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conséquences de l'accident</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Blessure, dommage à réparer, suspenssion du permis.." {...field} />
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
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Status de l'accident" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">

              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conducteur</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir un conducteur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {
                              driverOptions.map((driver) => {
                                return <SelectItem key={driver.id} value={driver.value}>{driver.name}</SelectItem>
                              })
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moto</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choisir une moto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {
                              motoOptions.map((moto) => {
                                return <SelectItem key={moto.id} value={moto.value}>{moto.name}</SelectItem>
                              })
                            }
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              Ajouter l'accident
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
