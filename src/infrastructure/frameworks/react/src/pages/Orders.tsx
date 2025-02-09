import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Badge, Eye, PlusCircle, Trash } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateOrderDialog } from "@/components/order/CreateOrderDialog";
import { Order } from "@/interfaces/OrderInterface";
import { getOrders } from "@/services/OrderServices";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "../components/ui/Button";

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "EN_ATTENTE":
      return "bg-[#F6AD55]";
    case "CONFIRMEE":
      return "bg-[#4299E1]";
    case "LIVREE":
      return "bg-[#48BB78]";
    default:
      return "bg-gray-500";
  }
};

const getStatusLabel = (status: Order["status"]) => {
  switch (status) {
    case "EN_ATTENTE":
      return "En attente";
    case "CONFIRMEE":
      return "Confirmée";
    case "LIVREE":
      return "Livrée";
    default:
      return status;
  }
};

const Orders = () => {
  const navigate = useNavigate();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos commandes de pièces détachées
          </p>
        </div>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Liste des commandes</CardTitle>
            <Button onClick={() => setShowCreateDialog(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle commande
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Montant Total</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date de commande</TableHead>
                  <TableHead>Date de livraison</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.totalAmount}€</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {moment(order.orderDate).format("D MMMM YYYY")}
                    </TableCell>
                    <TableCell>
                      {order.deliveryDate ? moment(order.deliveryDate).format("D MMMM YYYY") : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <CreateOrderDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </DashboardLayout>
  );
};

export default Orders;
