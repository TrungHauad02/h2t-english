import { Box, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import About from "./About";

export default function Footer() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: 1,
        borderColor: isDarkMode ? color.gray300 : color.gray400,
        backgroundColor: color.transparent,
        color: isDarkMode ? color.gray200 : color.gray800,
        width: "100%",
        p: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
          }}
        >
          H2T English
        </Typography>
        <About />
      </Stack>
    </Box>
  );
}
