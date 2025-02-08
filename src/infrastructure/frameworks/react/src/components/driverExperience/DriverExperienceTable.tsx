import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DriverExperience } from "@/lib/apiEntities";
import { useNavigate } from "react-router-dom";
interface ExperienceTableProps {
  experiences: DriverExperience[];
}
export const DriverExperienceTable = ({ experiences }: ExperienceTableProps) => {

  const navigate = useNavigate();

  return (
    <div className="rounded-md border bg-white/80 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Durée</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Loué</TableHead>
            <TableHead>Professionnel</TableHead>
            <TableHead>Retour</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map((experience) => (
            <TableRow style={{ cursor: "pointer" }} key={experience.id} onClick={() => navigate(`/conducteur/${experience.id}`)}>
              <TableCell>{experience.id}</TableCell>
              <TableCell>{experience.duration}</TableCell>
              <TableCell>{experience.type}</TableCell>
              <TableCell>{experience.rented}</TableCell>
              <TableCell>{experience.professional}</TableCell>
              <TableCell>{experience.feedback}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
