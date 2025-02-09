import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DriverLicense } from "@/interfaces/DriverLicenseInterface";
import { useNavigate } from "react-router-dom";
interface LicenseTableProps {
  licenses: DriverLicense[];
}
export const DriverLicenseTable = ({ licenses }: LicenseTableProps) => {

  const navigate = useNavigate();

  return (
    <div className="rounded-md border bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Numéro de permis</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Date d'expiration</TableHead>
            <TableHead>Date d'obtention</TableHead>
            <TableHead>Pays</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {licenses.map((license) => (
            <TableRow style={{ cursor: "pointer" }} key={license.id} onClick={() => navigate(`/conducteur/${license.id}`)}>
              <TableCell>{license.id}</TableCell>
              <TableCell>{license.licenseNumber}</TableCell>
              <TableCell>{license.category}</TableCell>
              <TableCell>{license.expiryDate.toString().split("T")[0]}</TableCell>
              <TableCell>{license.obtainDate.toString().split("T")[0]}</TableCell>
              <TableCell>{license.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
