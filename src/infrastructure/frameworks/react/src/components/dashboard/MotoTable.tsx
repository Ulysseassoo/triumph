import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Moto } from "@/interfaces/MotoInterface";
import { getLastPlannedMaintenanceDate } from "@/utils/maintenanceUtils";
import { useNavigate } from "react-router-dom";

interface MotoTableProps {
  motos: Moto[];
}

export const MotoTable = ({ motos }: MotoTableProps) => {
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
