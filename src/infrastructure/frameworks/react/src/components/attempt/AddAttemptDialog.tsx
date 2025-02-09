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
import { addAttempt, Attempt, AttemptStatus, Driver, Moto } from "@/lib/apiEntities";
import { Button } from "../ui/Button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
const formSchema = z.object({
  startDate: z.string().min(1, "Début d'essai requis"),
  endDate: z.string().min(1, "Fin d'essai requis"),
  startKilometer: z.number(),
  endKilometer: z.number(),
  status: z.string().min(1, "Statut requis"),
  driver: z.string().min(1, "Conducteur requis"),
  moto: z.string().min(1, "Moto requise"),
});
interface AddAttemptDialogProps {
  children: React.ReactNode;
  onAttemptAdded: (attempt: Attempt) => void;
  drivers: Driver[];
  motos: Moto[];
}

type FormValues = {
  startDate: string,
  endDate: string,
  startKilometer: number,
  endKilometer: number,
  status: AttemptStatus,
  driver: string
  moto: string
};

export const AddAttemptDialog = ({ children, onAttemptAdded, drivers, motos }: AddAttemptDialogProps) => {
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
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      startKilometer: 0,
      endKilometer: 0,
      status: AttemptStatus.GOING,
      driver: "",
      moto: ""
    },
  });
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      const attempt = await addAttempt({
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
        startKilometer: values.startKilometer,
        endKilometer: values.endKilometer,
        status: values.status,
        driver: drivers.filter(driver => driver.id === values.driver)[0],
        moto: motos.filter(moto => moto.id === values.moto)[0],
      });
      onAttemptAdded(attempt);
      toast({
        title: "Essai ajouté",
        description: "L'essai a été ajoutée avec succès.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter l'essai. Veuillez réessayer.",
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
          <DialogTitle>Ajouter un essai</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau essai pour une moto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début</FormLabel>
                  <FormControl>
                    <Input type='date' {...field} />
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
            <FormField
              control={form.control}
              name="startKilometer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilométrage de début</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 160" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endKilometer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kilométrage de fin</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 240" {...field} />
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
                          {Object.values(AttemptStatus).map((status) => (
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
            <Button type="submit" disabled={isSubmitting}>
              Ajouter l'essai
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  );
};