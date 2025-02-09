import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { WarrantyTable } from "@/components/warranty/WarrantyTable";
import { AddWarrantyDialog } from "@/components/warranty/AddWarrantyDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getWarranties } from "@/services/WarrantyServices";
import { Warranty } from "@/interfaces/WarrantyInterface";
const Warranties = () => {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWarranties();
        setWarranties(data);
      } catch (error) {
        console.error("Error fetching warranties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleWarrantyAdded = (newWarranty: Warranty) => {
    setWarranties((prev) => [...prev, newWarranty]);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded-md"></div>
          <div className="h-8 bg-gray-200 rounded-md"></div>
          <div className="h-8 bg-gray-200 rounded-md"></div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Garanties</h1>
            <p className="text-muted-foreground mt-2">
              Gestion des garanties des motos
            </p>
          </div>
          <AddWarrantyDialog onWarrantyAdded={handleWarrantyAdded}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une garantie
            </Button>
          </AddWarrantyDialog>
        </div>
        <WarrantyTable warranties={warranties} />
      </div>
    </DashboardLayout>
  );
};
export default Warranties;
