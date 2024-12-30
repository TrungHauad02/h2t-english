import { styled } from "@mui/material/styles";
import { AppBar, AppBarProps } from "@mui/material";

const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  transition: "all 0.3s",
  backgroundColor: theme.palette.mode === "dark" ? "#03071295" : "#ffffff95",
  backdropFilter: "blur(8px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 2px 1px #ffffff10"
      : "0px 2px 1px #00000020",
}));

export default StyledAppBar;
