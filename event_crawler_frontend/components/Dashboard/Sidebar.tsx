import { Bug } from "lucide-react";
import SidebarRoutes from "./SidebarRoutes";
// import Logo from "./SidebarLogo";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="flex p-6 flex-row items-center gap-2">
        {/* <Logo /> */}
        {/* <Bug className="h-12 w-12" /> */}
        <h3 className="font-inter font-bold text-2xl">🕷 EC </h3>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
