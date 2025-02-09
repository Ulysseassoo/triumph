import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NotificationsPopover from "../NotificationsPopover";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-triumph-light relative">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <SidebarTrigger className="mb-6 md:hidden" />
          <NotificationsPopover />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
