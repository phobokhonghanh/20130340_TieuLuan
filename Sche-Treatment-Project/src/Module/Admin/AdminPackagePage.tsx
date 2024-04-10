import { PackageManager } from "../../Component/AdminPackage";
import { AdminSidebar } from "../../Component/AdminSidebar";

export function AdminPackagePage() {
  return (
    <>
      <AdminSidebar />
      <PackageManager />
    </>
  );
}
