
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
import { Link } from "react-router-dom";
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
            <TableRow key={breakdown.id} className="cursor-pointer hover:bg-accent/50">
              <TableCell>
                <Link to={`/pannes/${breakdown.id}`} className="block">
                  {format(new Date(breakdown.date), "d MMMM yyyy", { locale: fr })}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/pannes/${breakdown.id}`} className="block">
                  {breakdown.motoId}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/pannes/${breakdown.id}`} className="block">
                  {breakdown.description}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/pannes/${breakdown.id}`} className="block">
                  <Badge variant={
                    breakdown.status === "RESOLVED" ? "default" :
                    breakdown.status === "DIAGNOSED" ? "secondary" : "destructive"
                  }>
                    {breakdown.status === "RESOLVED" ? "Résolu" :
                     breakdown.status === "DIAGNOSED" ? "Diagnostiqué" : "En attente"}
                  </Badge>
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/pannes/${breakdown.id}`} className="block">
                  {breakdown.warrantyId || "N/A"}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
