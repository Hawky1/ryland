import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  CreditCard,
  UserCheck,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";
import logoDark from "@/assets/logo-dark.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Users, label: "Affiliates", path: "/admin/affiliates" },
  { icon: UserCheck, label: "Leads", path: "/admin/leads" },
  { icon: DollarSign, label: "Commissions", path: "/admin/commissions" },
  { icon: CreditCard, label: "Payouts", path: "/admin/payouts" },
  { icon: BarChart3, label: "Reports", path: "/admin/reports" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="border-b border-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <img src={logoDark} alt="Ryland" className="h-5 w-auto" />
            <span className="text-xs text-slate-500 font-medium">Admin Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="py-4">
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== "/admin" && location.pathname.startsWith(item.path));
            
            return (
              <SidebarMenuItem key={item.path}>
                <NavLink to={item.path} end={item.path === "/admin"}>
                  <SidebarMenuButton
                    isActive={isActive}
                    className="w-full justify-start gap-3 px-4 py-2.5 text-sm font-medium transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </NavLink>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
