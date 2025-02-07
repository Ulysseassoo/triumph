import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Moto } from "@/lib/api";
  
  interface MotoTableProps {
    motos: Moto[];
  }
  
  export const MotoTable = ({ motos }: MotoTableProps) => {
    return (
      <div className="rounded-md border bg-white/80 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Modèle</TableHead>
              <TableHead>Kilométrage</TableHead>
              <TableHead>Dernier entretien</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {motos.map((moto) => (
              <TableRow key={moto.id} className="hover:bg-white/90">
                <TableCell className="font-medium">{moto.model}</TableCell>
                <TableCell>{moto.currentMileage} km</TableCell>
                <TableCell>
                  {new Date(moto.lastMaintenance).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };