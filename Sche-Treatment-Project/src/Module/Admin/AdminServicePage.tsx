import { ServiceManager } from "../../Component/AdminService";
import { AdminSidebar } from "../../Component/AdminSidebar";

export function AdminServicePage() {
  return (
    <>
      <AdminSidebar />
      <ServiceManager />
    </>
  );
}
