import React, { useState } from "react";
import { SidebarDrawer } from "./sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";

export default function SidebarAdmin() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
    {
      text: "User Management",
      icon: <PeopleIcon />,
      children: [
        {
          text: "Students",
          path: "/admin/manage-student",
          icon: <SchoolIcon />,
        },
        {
          text: "Teachers",
          path: "/admin/manage-teacher",
          icon: <PeopleIcon />,
        },
      ],
    },
    { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
    { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  return (
    <SidebarDrawer
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      menuItems={menuItems}
    />
  );
}
