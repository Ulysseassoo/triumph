import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Attempt } from "@/lib/apiEntities";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
interface AttemptTableProps {
  attempts: Attempt[];
}
export const AttemptTable = ({ attempts }: AttemptTableProps) => {
  return (
    <div className="rounded-md border bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Kilométrage de départ</TableHead>
            <TableHead>Kilométrage de fin</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.map((attempt) => (
            <TableRow key={attempt.id}>
              <TableCell>{attempt.id}</TableCell>
              <TableCell>
                {format(new Date(attempt.startDate), "d MMMM yyyy", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>
                {format(new Date(attempt.endDate), "d MMMM yyyy", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>{attempt.startKilometer}</TableCell>
              <TableCell>{attempt.endKilometer}</TableCell>
              <TableCell>{attempt.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
