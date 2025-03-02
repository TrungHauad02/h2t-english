import { Box, Typography } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { Route } from "interfaces";

interface RouteHeaderProps {
  route: Route;
}

export default function RouteHeader({ route }: RouteHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray100 : color.gray900;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: isDarkMode ? color.teal300 : color.teal500,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {route.title}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: textColor, textAlign: "center", mt: 2 }}
      >
        {route.description}
      </Typography>
    </Box>
  );
}
