import {
  LayoutDashboard, Users, DollarSign, Calculator,
  BookOpen, CalendarDays, Mic2, Settings, LogOut
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import logoWhite from "@/assets/logo-white.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/portal", icon: LayoutDashboard },
  { title: "My Leads", url: "/portal/leads", icon: Users },
  { title: "Commissions", url: "/portal/commissions", icon: DollarSign },
  { title: "Calculator", url: "/portal/calculator", icon: Calculator },
];

const supportNav = [
  { title: "Resources", url: "/portal/resources", icon: BookOpen },
  { title: "Events", url: "/portal/events", icon: CalendarDays },
  { title: "Speaking Request", url: "/portal/speaking", icon: Mic2 },
];

const accountNav = [
  { title: "Settings", url: "/portal/settings", icon: Settings },
];

export default function PortalSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { signOut, affiliate } = useAuth();

  const isActive = (path: string) => {
    if (path === "/portal") return location.pathname === "/portal";
    return location.pathname.startsWith(path);
  };

  const renderGroup = (label: string, items: typeof mainNav) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel className="text-sidebar-foreground/60 text-[11px] uppercase tracking-widest">{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                tooltip={collapsed ? item.title : undefined}
              >
                <NavLink
                  to={item.url}
                  end={item.url === "/portal"}
                  className="transition-colors"
                  activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <img src={logoWhite} alt="Ryland Partners" className="h-7 w-auto" />
          {!collapsed && (
            <span className="text-sm font-semibold text-sidebar-foreground tracking-tight">
              Partner Portal
            </span>
          )}
        </div>

        {/* Affiliate badge */}
        {!collapsed && affiliate && (
          <div className="mx-3 mt-3 rounded-lg bg-sidebar-accent/50 border border-sidebar-border px-3 py-2.5">
            <p className="text-[11px] text-sidebar-foreground/60 uppercase tracking-wider">Affiliate ID</p>
            <p className="text-sm font-mono font-semibold text-sidebar-foreground mt-0.5">{affiliate.affiliate_id}</p>
          </div>
        )}

        <div className="mt-2">
          {renderGroup("Main", mainNav)}
          {renderGroup("Support", supportNav)}
          {renderGroup("Account", accountNav)}
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={signOut}
              tooltip={collapsed ? "Sign Out" : undefined}
              className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              {!collapsed && <span>Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
