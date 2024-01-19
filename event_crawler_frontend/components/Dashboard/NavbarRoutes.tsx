import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";

const NavbarRoutes = () => {
  return (
    <div className="flex gap-x-2 ml-auto items-center">
      <Button variant="ghost">
        <BellRing className="h-4 w-4 animate-bounce" />
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default NavbarRoutes;
