// import Logo from "@/app/Dashboard/_components/SidebarLogo";
import NavbarMenu from "./NavbarMenu";
import AuthAvatar from "./AuthAvatar";

const Navbar = () => {
  return (
    <div className="p-3 border-b h-full flex items-center bg-white shadow-sm">
      {/* <Logo /> */}
      EventCrawler
      <NavbarMenu />
      <AuthAvatar />
    </div>
  );
};

export default Navbar;
