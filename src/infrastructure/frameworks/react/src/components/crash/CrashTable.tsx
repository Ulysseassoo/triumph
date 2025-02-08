import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Crash } from "@/lib/apiEntities";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CrashTableProps {
  crashes: Crash[];
}

export const CrashTable = ({ crashes }: CrashTableProps) => {
  return (
    <div className="rounded-md border bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Lieu</TableHead>
            <TableHead>Responsabilités</TableHead>
            <TableHead>Conséquences</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crashes.map((crash) => (
            <TableRow key={crash.id}>
              <TableCell>{crash.id}</TableCell>
              <TableCell>{crash.type}</TableCell>
              <TableCell>
                {format(new Date(crash.date), "d MMMM yyyy", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>{crash.description}</TableCell>
              <TableCell>{crash.location}</TableCell>
              <TableCell>{crash.responsability}</TableCell>
              <TableCell>{crash.consequence}</TableCell>
              <TableCell>{crash.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
