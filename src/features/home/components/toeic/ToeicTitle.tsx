import { Box, Button, Grid, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useNavigate } from "react-router-dom";

export default function ToeicTitle() {
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/toeic");
  };

  return (
    <Grid item xs={12} md={5}>
      <Box
        sx={{
          pr: { md: 4 },
          position: "relative",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: "fit-content",
            mb: 2,
            py: 0.5,
            px: 2,
            borderRadius: "30px",
            background: isDarkMode
              ? `linear-gradient(90deg, ${colors.teal900}, ${colors.emerald900})`
              : `linear-gradient(90deg, ${colors.teal100}, ${colors.emerald100})`,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: isDarkMode ? colors.teal300 : colors.teal700,
            }}
          >
            AI-POWERED ASSESSMENT
          </Typography>
        </Box>

        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 800,
            mb: 3,
            background: isDarkMode
              ? `linear-gradient(90deg, ${colors.teal400}, ${colors.emerald400})`
              : `linear-gradient(90deg, ${colors.teal700}, ${colors.emerald700})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            textFillColor: "transparent",
          }}
        >
          TOEIC Practice Tests
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontSize: "1.1rem",
            lineHeight: 1.6,
            color: isDarkMode ? colors.gray300 : colors.gray700,
          }}
        >
          Take our comprehensive TOEIC practice tests and receive detailed
          AI-powered feedback on your performance. Our system analyzes your
          strengths and weaknesses to help you improve your score effectively.
        </Typography>

        <Box sx={{ mt: 4, display: { xs: "none", md: "block" } }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              mb: 2,
              color: isDarkMode ? colors.gray200 : colors.gray800,
            }}
          >
            Why test with us?
          </Typography>

          <Box
            component="ul"
            sx={{
              pl: 2,
              listStyleType: "none",
              "& li": {
                position: "relative",
                pl: 3,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 8,
                  height: 8,
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
                mb: 1.5,
                color: isDarkMode ? colors.gray300 : colors.gray700,
              }}
            >
              Authentic TOEIC-style questions and format
            </Typography>
            <Typography
              component="li"
              sx={{
                mb: 1.5,
                color: isDarkMode ? colors.gray300 : colors.gray700,
              }}
            >
              AI-powered performance analysis
            </Typography>
            <Typography
              component="li"
              sx={{
                mb: 1.5,
                color: isDarkMode ? colors.gray300 : colors.gray700,
              }}
            >
              Personalized improvement suggestions
            </Typography>
            <Typography
              component="li"
              sx={{
                mb: 1.5,
                color: isDarkMode ? colors.gray300 : colors.gray700,
              }}
            >
              Track your progress over time
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<KeyboardDoubleArrowRightIcon />}
            onClick={handleClick}
            sx={{
              mt: 4,
              px: 3,
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
                transform: "translateY(-2px)",
                transition: "all 0.3s ease",
              },
            }}
          >
            Start Practice Test
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
