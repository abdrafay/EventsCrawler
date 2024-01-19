"use client";
import { Layout, User, BellRing, Heart } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

const SidebarRoutes = () => {
  const routes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: `/Dashboard/`,
    },
    {
      icon: Heart,
      label: "Favorites",
      href: `/Dashboard/favourites`,
    },
    {
      icon: BellRing,
      label: "Notifications",
      href: `/Dashboard/notifications`,
    },
    {
      icon: User,
      label: "Profile",
      href: `/Dashboard/profile`,
    },
  ];
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
