import {
  Box,
  Typography,
  Chip,
  useMediaQuery,
  Theme,
  Fade,
  Grow,
  Paper,
  Divider,
  Tooltip,
  Badge,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import TrophyIcon from "@mui/icons-material/EmojiEvents";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { CompetitionTest } from "interfaces";

interface LeaderboardTitleProps {
  mostRecentCompetition: CompetitionTest | null;
}

export default function LeaderboardTitle({
  mostRecentCompetition,
}: LeaderboardTitleProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <Paper
      elevation={0}
      sx={{
        mb: { xs: 4, md: 5 },
        p: { xs: 2, md: 3 },
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDarkMode
            ? `radial-gradient(circle at bottom right, ${color.teal900}30, transparent 70%), 
               radial-gradient(circle at top left, ${color.emerald900}20, transparent 60%)`
            : `radial-gradient(circle at bottom right, ${color.teal100}60, transparent 70%), 
               radial-gradient(circle at top left, ${color.emerald100}40, transparent 60%)`,
          zIndex: -1,
          borderRadius: 4,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
          textAlign: { xs: "center", md: "left" },
          position: "relative",
        }}
      >
        <Grow in={true} timeout={800}>
          <Box
            sx={{
              mb: { xs: 3, md: 0 },
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Decoration elements */}
            <Box
              sx={{
                position: "absolute",
                top: -15,
                right: isMobile ? -20 : -120,
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: isDarkMode ? color.teal700 : color.teal300,
                opacity: 0.2,
                filter: "blur(15px)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -20,
                left: isMobile ? -10 : -60,
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: isDarkMode
                  ? color.emerald700
                  : color.emerald300,
                opacity: 0.15,
                filter: "blur(10px)",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 1.5,
                position: "relative",
              }}
            >
              {/* Trophy icon container with glow effect */}
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={
                  <WhatshotIcon
                    sx={{
                      fontSize: 18,
                      color: isDarkMode ? color.teal300 : color.teal600,
                      filter: isDarkMode
                        ? "drop-shadow(0 0 3px rgba(94, 234, 212, 0.5))"
                        : "none",
                    }}
                  />
                }
              >
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${
                      isDarkMode ? color.teal700 : color.teal600
                    } 0%, ${isDarkMode ? color.teal900 : color.teal400} 100%)`,
                    borderRadius: "50%",
                    width: { xs: 52, md: 58 },
                    height: { xs: 52, md: 58 },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: isDarkMode
                      ? `0 0 20px rgba(20, 184, 166, 0.35), 
                         inset 0 0 15px rgba(20, 184, 166, 0.2)`
                      : `0 0 15px rgba(20, 184, 166, 0.25), 
                         inset 0 0 10px rgba(20, 184, 166, 0.1)`,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)",
                      zIndex: 1,
                    },
                    animation: "pulse 3s infinite ease-in-out",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                >
                  <TrophyIcon
                    sx={{
                      color: color.white,
                      fontSize: { xs: 28, md: 32 },
                      filter: "drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2))",
                      zIndex: 2,
                    }}
                  />
                </Box>
              </Badge>

              <Box sx={{ position: "relative" }}>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  component="h2"
                  sx={{
                    fontWeight: 800,
                    background: isDarkMode
                      ? `linear-gradient(135deg, ${color.white} 0%, ${color.teal200} 100%)`
                      : `linear-gradient(135deg, ${color.teal900} 0%, ${color.teal600} 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "1px",
                    textShadow: isDarkMode
                      ? "0 2px 10px rgba(20, 184, 166, 0.3)"
                      : "0 2px 5px rgba(20, 184, 166, 0.1)",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      width: "40%",
                      height: 3,
                      background: isDarkMode
                        ? `linear-gradient(90deg, ${color.teal400}, transparent)`
                        : `linear-gradient(90deg, ${color.teal600}, transparent)`,
                      borderRadius: 2,
                    },
                  }}
                >
                  Championship
                </Typography>
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  component="h3"
                  sx={{
                    fontWeight: 700,
                    color: isDarkMode ? color.gray300 : color.gray700,
                    letterSpacing: "0.5px",
                    mt: 0.5,
                  }}
                >
                  Leaderboard
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: isDarkMode
                  ? `${color.gray800}70`
                  : `${color.gray100}90`,
                borderRadius: "20px",
                px: 2,
                py: 1,
                maxWidth: { xs: "100%", md: "90%" },
                position: "relative",
                backdropFilter: "blur(8px)",
                borderLeft: `3px solid ${
                  isDarkMode ? color.teal700 : color.teal400
                }`,
                boxShadow: isDarkMode
                  ? "0 2px 8px rgba(0, 0, 0, 0.3)"
                  : "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <GroupIcon
                sx={{
                  fontSize: 20,
                  mr: 1,
                  color: isDarkMode ? color.teal400 : color.teal600,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: isDarkMode ? color.gray300 : color.gray700,
                  fontWeight: 500,
                }}
              >
                Top performers from our most recent competition
              </Typography>
            </Box>
          </Box>
        </Grow>

        {mostRecentCompetition && (
          <Fade in={true} timeout={1200}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-end",
                gap: 1,
              }}
            >
              <Tooltip title="Active competition" placement="top" arrow>
                <Chip
                  label={mostRecentCompetition.title}
                  icon={<StarIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: isDarkMode
                      ? `rgba(15, 118, 110, 0.3)`
                      : `rgba(204, 251, 241, 0.8)`,
                    color: isDarkMode ? color.teal200 : color.teal800,
                    backdropFilter: "blur(12px)",
                    border: `2px solid ${
                      isDarkMode ? color.teal700 : color.teal300
                    }`,
                    borderRadius: "16px",
                    padding: { xs: "6px", md: "10px 6px" },
                    height: "auto",
                    minHeight: 40,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    transition: "all 0.3s ease",
                    maxWidth: { xs: "90%", md: "auto" },
                    "& .MuiChip-label": {
                      padding: { xs: "6px 10px", md: "8px 14px 8px 10px" },
                    },
                    "& .MuiChip-icon": {
                      marginLeft: { xs: "8px", md: "10px" },
                      color: isDarkMode ? color.teal300 : color.teal600,
                    },
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: isDarkMode
                        ? "0 6px 15px rgba(0, 0, 0, 0.3)"
                        : "0 6px 15px rgba(0, 0, 0, 0.1)",
                      backgroundColor: isDarkMode
                        ? `rgba(15, 118, 110, 0.4)`
                        : `rgba(204, 251, 241, 0.9)`,
                    },
                  }}
                />
              </Tooltip>

              {!isMobile && (
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? color.gray400 : color.gray600,
                    textAlign: "right",
                    fontStyle: "italic",
                    mr: 1,
                  }}
                >
                  Ranking updated daily
                </Typography>
              )}
            </Box>
          </Fade>
        )}

        {!mostRecentCompetition && (
          <Fade in={true} timeout={1200}>
            <Chip
              label="No competition available"
              sx={{
                backgroundColor: isDarkMode
                  ? `${color.gray800}80`
                  : `${color.gray100}80`,
                color: isDarkMode ? color.gray400 : color.gray600,
                border: `1px solid ${
                  isDarkMode ? color.gray700 : color.gray300
                }`,
                borderRadius: "16px",
                padding: "6px",
                height: "auto",
                backdropFilter: "blur(8px)",
              }}
            />
          </Fade>
        )}
      </Box>

      <Divider
        sx={{
          mt: 3,
          mb: 1,
          opacity: 0.6,
          background: isDarkMode
            ? `linear-gradient(90deg, ${color.teal700} 0%, transparent 85%)`
            : `linear-gradient(90deg, ${color.teal500} 0%, transparent 85%)`,
          height: 2,
          borderRadius: 1,
        }}
      />
    </Paper>
  );
}
