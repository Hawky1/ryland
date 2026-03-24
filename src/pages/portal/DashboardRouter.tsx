import { useAdminRole } from "@/hooks/useAdminRole";
import PortalContentLoader from "@/components/portal/PortalContentLoader";
import { lazy, Suspense } from "react";

const AdminDashboard = lazy(() => import("./AdminDashboard"));
const PortalDashboard = lazy(() => import("./PortalDashboard"));

export default function DashboardRouter() {
  const { isAdmin, isLoading } = useAdminRole();

  if (isLoading) return <PortalContentLoader />;

  return (
    <Suspense fallback={<PortalContentLoader />}>
      {isAdmin ? <AdminDashboard /> : <PortalDashboard />}
    </Suspense>
  );
}
