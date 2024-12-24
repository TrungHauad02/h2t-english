import { Outlet } from "react-router-dom";
import UserHeader from "./header/UserHeader";
import Footer from "./footer/Footer";
import { Box } from "@mui/material";

export default function UserLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <UserHeader />
      <Outlet />
      <Footer />
    </Box>
  );
}
