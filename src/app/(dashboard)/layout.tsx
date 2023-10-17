import DashboardLayout from "@/layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head />
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
};

export default Layout;
