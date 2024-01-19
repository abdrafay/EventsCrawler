// import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "./NavbarRoutes";

const Navbar = () => {
  return (
    <div className="p-2 border-b flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
