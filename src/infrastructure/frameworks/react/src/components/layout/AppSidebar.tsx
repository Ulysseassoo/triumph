import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Bike,
  Wrench,
  LogOut,
  AlertTriangle,
  Shield,
  Users,
  Hospital,
  Notebook,
  ShoppingCart,
  Package
} from "lucide-react";
import { Badge } from "../ui/Badge";
import { getMaintenances } from "@/services/MaintenanceServices";
import { getOverdueMaintenances } from "@/utils/maintenanceUtils";

export function AppSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const maintenances = await getMaintenances();
        const overdue = getOverdueMaintenances(maintenances).length
        setOverdueCount(overdue);
      } catch (error) {
        console.error("Error fetching maintenances:", error);
      }
    };

    fetchMaintenances();
  }, []);

  const items = [
    {
      title: "Tableau de bord",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Motos",
      path: "/motos",
      icon: Bike,
    },
    {
      title: "Entretiens",
      path: "/maintenances",
      icon: Wrench,
      badge: overdueCount > 0 ? overdueCount : undefined,
    },
    {
      title: "Pannes",
      path: "/pannes",
      icon: AlertTriangle,
    },
    {
      title: "Garanties",
      path: "/garanties",
      icon: Shield,
    },
    {
      title: "Conducteurs",
      path: "/conducteurs",
      icon: Users,
    },
    {
      title: "Essais",
      path: "/essais",
      icon: Notebook,
    },
    {
      title: "Accidents",
      path: "/accidents",
      icon: Hospital,
    },
    {
      title: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },
    {
      title: "Pieces",
      path: "/pieces",
      icon: Package,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <img
            src="/logo-moto.png"
            alt="Triumph"
            className="h-8 w-auto"
          />
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    className={
                      location.pathname === item.path
                        ? "bg-accent text-accent-foreground"
                        : ""
                    }
                  >
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant="destructive"
                          className="ml-auto bg-triumph-red"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}