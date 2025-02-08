import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Maintenance, Moto } from "@/lib/apiEntities";
import { useNavigate } from "react-router-dom";

interface MotoTableProps {
  motos: Moto[];
}

export const MotoTable = ({ motos }: MotoTableProps) => {
  const getLastPlannedMaintenanceDate = (
    maintenances: Maintenance[]
  ): Date | null => {
    if (!maintenances || maintenances.length === 0) {
      return null;
    }

    const sortedMaintenances = maintenances
      .filter((maintenance) => maintenance.plannedDate)
      .sort(
        (a, b) =>
          new Date(b.plannedDate).getTime() - new Date(a.plannedDate).getTime()
      );

    return sortedMaintenances.length > 0
      ? new Date(sortedMaintenances[0].plannedDate)
      : null;
  };
  const navigate = useNavigate();

  return (
    <div className="rounded-md border bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Modèle</TableHead>
            <TableHead>Kilométrage</TableHead>
            <TableCell>Statut</TableCell>
            <TableHead>Dernier entretien</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {motos.map((moto) => (
            <TableRow
              key={moto.id}
              className="hover:bg-white/90 cursor-pointer"
              onClick={() => navigate(`/motos/${moto.id}`)}
            >
              <TableCell className="font-medium">{moto.model}</TableCell>
              <TableCell>{moto.currentMileage} km</TableCell>
              <TableCell>{moto.status}</TableCell>
              <TableCell>
                {moto.maintenances && moto.maintenances.length > 0
                  ? getLastPlannedMaintenanceDate(
                      moto.maintenances
                    )?.toLocaleDateString() || "-"
                  : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
