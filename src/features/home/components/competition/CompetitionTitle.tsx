import { Box, Typography, Button } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import useColor from "theme/useColor";

export default function CompetitionTitle() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      <Box sx={{ mb: { xs: 2, sm: 0 } }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: isDarkMode ? colors.teal300 : colors.teal700,
          }}
        >
          Competitions
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isDarkMode ? colors.gray300 : colors.gray700,
          }}
        >
          Challenge yourself and compete with other learners in our English
          competitions
        </Typography>
      </Box>
      <Button
        variant="outlined"
        sx={{
          borderColor: isDarkMode ? colors.teal400 : colors.teal600,
          color: isDarkMode ? colors.teal400 : colors.teal600,
          "&:hover": {
            borderColor: isDarkMode ? colors.teal300 : colors.teal700,
            backgroundColor: "transparent",
          },
          width: { xs: "100%", sm: "auto" },
        }}
        onClick={() => navigate("/competition-test")}
      >
        All Competitions
      </Button>
    </Box>
  );
}
