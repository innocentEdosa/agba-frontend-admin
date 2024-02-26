import DashboardLayout from "@/layout";
import ProtectRoute from "./protect";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectRoute>
  );
};

export default Layout;
