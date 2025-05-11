import { Box, Button, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

export default function ToeicContent() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/toeic");
  };

  return (
    <Box
      sx={{
        mt: 5,
        display: { xs: "block", md: "none" },
        pt: 3,
        borderTop: `1px solid ${isDarkMode ? colors.gray700 : colors.gray200}`,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          mb: 2.5,
          color: isDarkMode ? colors.gray200 : colors.gray800,
        }}
      >
        Why test with us?
      </Typography>
      <Box
        component="ul"
        sx={{
          pl: 0,
          listStyleType: "none",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          mb: 3,
          "& li": {
            position: "relative",
            pl: 3,
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: isDarkMode
                ? `linear-gradient(135deg, ${colors.teal400}, ${colors.emerald400})`
                : `linear-gradient(135deg, ${colors.teal600}, ${colors.emerald600})`,
            },
          },
        }}
      >
        <Typography
          component="li"
          sx={{
            color: isDarkMode ? colors.gray300 : colors.gray700,
            fontSize: "0.9rem",
          }}
        >
          Authentic TOEIC format
        </Typography>
        <Typography
          component="li"
          sx={{
            color: isDarkMode ? colors.gray300 : colors.gray700,
            fontSize: "0.9rem",
          }}
        >
          AI feedback system
        </Typography>
        <Typography
          component="li"
          sx={{
            color: isDarkMode ? colors.gray300 : colors.gray700,
            fontSize: "0.9rem",
          }}
        >
          Improvement suggestions
        </Typography>
        <Typography
          component="li"
          sx={{
            color: isDarkMode ? colors.gray300 : colors.gray700,
            fontSize: "0.9rem",
          }}
        >
          Progress tracking
        </Typography>
      </Box>
      <Button
        variant="contained"
        fullWidth
        endIcon={<KeyboardDoubleArrowRightIcon />}
        onClick={handleClick}
        sx={{
          mt: 2,
          py: 1.2,
          borderRadius: "8px",
          fontWeight: 600,
          textTransform: "none",
          boxShadow: isDarkMode
            ? "0 4px 12px rgba(0,0,0,0.3)"
            : "0 4px 12px rgba(0,0,0,0.12)",
          background: isDarkMode
            ? `linear-gradient(90deg, ${colors.teal600}, ${colors.emerald600})`
            : `linear-gradient(90deg, ${colors.teal500}, ${colors.emerald500})`,
          "&:hover": {
            background: isDarkMode
              ? `linear-gradient(90deg, ${colors.teal500}, ${colors.emerald500})`
              : `linear-gradient(90deg, ${colors.teal600}, ${colors.emerald600})`,
            boxShadow: isDarkMode
              ? "0 6px 16px rgba(0,0,0,0.4)"
              : "0 6px 16px rgba(0,0,0,0.18)",
          },
        }}
      >
        Start Practice Test
      </Button>
    </Box>
  );
}
