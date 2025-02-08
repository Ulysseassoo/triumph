import PieceUser from "./components/page/piece/PieceUser";
import CreatePiece from "./components/page/piece/CreatePiece";
import PieceStaff from "./components/page/piece/PieceStaff";
import PieceEdit from "./components/page/piece/pieceEdit";
import OrderStaff from "./components/page/order/OrderStaff";
import CreateOrder from "./components/page/order/CreateOrder";
import OrderEdit from "./components/page/order/OrderEdit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import MotoDetails from "./pages/MotoDetails";
import Breakdowns from "./pages/Breakdowns";
import Warranties from "./pages/Warranties";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/motos/:id" element={<MotoDetails />} />
              <Route path="/pannes" element={<Breakdowns />} />
              <Route path="/garanties" element={<Warranties />} />
              <Route path="/pieces/user" element={<PieceUser />} />
              <Route path="/create/piece" element={<CreatePiece />} />
              <Route path="/pieces/staff" element={<PieceStaff />} />
              <Route path="/pieces/edit/:id" element={<PieceEdit />} />
              <Route path="/create/order" element={<CreateOrder />} />
              <Route path="/orders/staff" element={<OrderStaff />} />
              <Route path="/orders/edit/:id" element={<OrderEdit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
