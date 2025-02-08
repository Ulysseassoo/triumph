import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Driver } from "@/lib/apiEntities";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
interface DriverTableProps {
  drivers: Driver[];
}
export const DriverTable = ({ drivers }: DriverTableProps) => {

  const navigate = useNavigate();

  return (
    <div className="rounded-md border bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Nom de famille</TableHead>
            <TableHead>Date de naissance</TableHead>
            <TableHead>Adresse</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow style={{ cursor: "pointer" }} key={driver.id} onClick={() => navigate(`/conducteur/${driver.id}`)}>
              <TableCell>{driver.id}</TableCell>
              <TableCell>{driver.firstname}</TableCell>
              <TableCell>{driver.lastname}</TableCell>
              <TableCell>
                {format(new Date(driver.birthdate), "d MMMM yyyy", {
                  locale: fr,
                })}
              </TableCell>
              <TableCell>{driver.addresse}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
