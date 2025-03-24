import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const HexagonWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "90px",
  height: "104px",
  margin: "0 auto",
}));

export const HexagonInner = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
}));

export const HexagonBefore = styled(Box)(({ theme }) => ({
  content: '""',
  position: "absolute",
  width: "100%",
  height: "100%",
  transform: "rotate(60deg)",
}));

export const HexagonAfter = styled(Box)(({ theme }) => ({
  content: '""',
  position: "absolute",
  width: "100%",
  height: "100%",
  transform: "rotate(-60deg)",
}));
