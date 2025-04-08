import { Typography, Box } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import BookIcon from "@mui/icons-material/Book";

export default function NotFoundRoute() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        textAlign: "center",
      }}
    >
      <BookIcon
        sx={{
          fontSize: 64,
          color: isDarkMode ? color.gray600 : color.gray400,
          mb: 2,
        }}
      />
      <Typography
        variant="h5"
        sx={{
          color: isDarkMode ? color.gray300 : color.gray700,
          mb: 1,
        }}
      >
        No routes found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: isDarkMode ? color.gray400 : color.gray600,
          maxWidth: 500,
        }}
      >
        We couldn't find any learning routes matching your search criteria. Try
        using different keywords or browse all available routes.
      </Typography>
    </Box>
  );
}
