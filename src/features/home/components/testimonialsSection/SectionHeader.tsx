import { Box, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export default function SectionHeader() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box sx={{ mb: 6, textAlign: "center" }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: isDarkMode ? color.teal300 : color.teal700,
          position: "relative",
          display: "inline-block",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "3px",
            backgroundColor: isDarkMode ? color.teal400 : color.teal600,
            borderRadius: "2px",
          },
        }}
      >
        Words of Wisdom
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mt: 3,
          maxWidth: 700,
          mx: "auto",
          color: isDarkMode ? color.gray300 : color.gray700,
          fontSize: { xs: "1rem", md: "1.1rem" },
          lineHeight: 1.6,
        }}
      >
        Discover inspiring quotes from visionaries, leaders, and thinkers across
        the world. Let their wisdom guide your language learning journey.
      </Typography>
    </Box>
  );
}
