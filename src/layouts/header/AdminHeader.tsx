import { Container, Toolbar, useScrollTrigger, Box } from "@mui/material";
import { StyledAppBar } from "./common";
import { drawerWidth } from "./common/SidebarAdmin";

export default function AdminHeader() {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  return (
    <StyledAppBar
      position="fixed"
      elevation={trigger ? 4 : 0}
      color="transparent"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`, // Bù trừ không gian của Sidebar
        marginLeft: `${drawerWidth}px`, // Đẩy Header sang phải đúng bằng chiều rộng Sidebar
        zIndex: (theme) => theme.zIndex.drawer + 1, // Nằm trên Sidebar
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>Admin</Box>
          <Box>Admin 12</Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
