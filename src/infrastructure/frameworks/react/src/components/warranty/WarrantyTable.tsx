import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "../ui/Badge";
import { Warranty } from "@/interfaces/WarrantyInterface";
interface WarrantyTableProps {
  warranties: Warranty[];
}
export const WarrantyTable = ({ warranties }: WarrantyTableProps) => {
  return (
    <div className="rounded-md border bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Moto ID</TableHead>
            <TableHead>Date de début</TableHead>
            <TableHead>Date de fin</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {warranties.map((warranty) => (
            <TableRow key={warranty.id}>
              <TableCell>{warranty.id}</TableCell>
              <TableCell>{warranty.motoId}</TableCell>
              <TableCell>
                {format(new Date(warranty.startDate), "d MMMM yyyy", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>
                {format(new Date(warranty.endDate), "d MMMM yyyy", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    new Date(warranty.endDate) > new Date()
                      ? "default"
                      : "destructive"
                  }
                >
                  {new Date(warranty.endDate) > new Date()
                    ? "Active"
                    : "Expirée"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
