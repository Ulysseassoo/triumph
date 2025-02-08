import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Breakdown } from "@/lib/apiEntities";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "../ui/Badge";
interface BreakdownTableProps {
  breakdowns: Breakdown[];
}
export const BreakdownTable = ({ breakdowns }: BreakdownTableProps) => {
  return (
    <div className="rounded-md border bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Moto ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Garantie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {breakdowns.map((breakdown) => (
            <TableRow key={breakdown.id}>
              <TableCell>
                {format(new Date(breakdown.createdAt), "d MMMM yyyy", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>{breakdown.motoId}</TableCell>
              <TableCell>{breakdown.description}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    breakdown.status === "RESOLVED"
                      ? "default"
                      : breakdown.status === "DIAGNOSED"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {breakdown.status === "RESOLVED"
                    ? "Résolu"
                    : breakdown.status === "DIAGNOSED"
                    ? "Diagnostiqué"
                    : "En attente"}
                </Badge>
              </TableCell>
              <TableCell>{breakdown.warrantyId || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
