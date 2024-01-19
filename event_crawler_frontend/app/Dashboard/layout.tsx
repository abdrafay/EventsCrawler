import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="h-[55px] md:pl-48 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-48 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-48 h-full pt-20 w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
