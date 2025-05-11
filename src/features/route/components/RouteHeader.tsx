import {
  Box,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
  CardMedia,
  Stack,
  Button,
  alpha,
  Paper,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Route, RouteNodeEnum } from "interfaces";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { formatDate } from "utils/format";
import { useNavigate } from "react-router-dom";

interface RouteHeaderProps {
  route: Route;
}

export default function RouteHeader({ route }: RouteHeaderProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // Dynamic color variables
  const cardBgColor = isDarkMode ? color.gray900 : color.white;
  const accentGradient = `linear-gradient(135deg, ${color.teal400}, ${color.emerald500})`;
  const textColor = isDarkMode ? color.white : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray700;

  const handleStartLearning = () => {
    let prefix = "";
    switch (route.routeNodes[0].type) {
      case RouteNodeEnum.VOCABULARY:
        prefix = "/lesson/topics";
        break;
      case RouteNodeEnum.GRAMMAR:
        prefix = "/lesson/grammars";
        break;
      case RouteNodeEnum.READING:
        prefix = "/lesson/readings";
        break;
      case RouteNodeEnum.LISTENING:
        prefix = "/lesson/listenings";
        break;
      case RouteNodeEnum.WRITING:
        prefix = "/lesson/writings";
        break;
      case RouteNodeEnum.SPEAKING:
        prefix = "/lesson/speakings";
        break;
      case RouteNodeEnum.MIXING_TEST:
        prefix = "/test/mixings";
        break;
      case RouteNodeEnum.READING_TEST:
        prefix = "/test/readings";
        break;
      case RouteNodeEnum.LISTENING_TEST:
        prefix = "/test/listenings";
        break;
      case RouteNodeEnum.WRITING_TEST:
        prefix = "/test/writings";
        break;
      case RouteNodeEnum.SPEAKING_TEST:
        prefix = "/test/speakings";
        break;
      default:
        break;
    }
    navigate(`${prefix}/${route.routeNodes[0].nodeId}`);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        position: "relative",
        overflow: "visible",
        borderRadius: { xs: 3, md: 4 },
        backgroundColor: "transparent",
        mb: 6,
        mt: 4,
        height: "100%",
      }}
    >
      {/* Animated accent element */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: -15, md: -20 },
          left: { xs: 20, md: 40 },
          width: { xs: 80, md: 120 },
          height: { xs: 4, md: 6 },
          background: `linear-gradient(90deg, ${color.teal400}, ${color.emerald500})`,
          borderRadius: 10,
          zIndex: 10,
          boxShadow: `0 0 15px ${alpha(color.teal400, 0.6)}`,
        }}
      />

      {/* Main card */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          position: "relative",
          overflow: "hidden",
          borderRadius: { xs: 3, md: 4 },
          boxShadow: theme.shadows[8],
          height: { xs: "100%", md: "460px" },
          backgroundColor: cardBgColor,
        }}
      >
        {/* Left section - Image with gradient overlay */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "220px", sm: "280px", md: "100%" },
            overflow: "hidden",
            clipPath: {
              xs: "none",
              md: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)",
            },
            zIndex: 1,
          }}
        >
          <CardMedia
            component="img"
            image={route.image}
            alt={route.title}
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(0.85)",
              transition: "transform 0.5s ease",
              "&:hover": {
                transform: { xs: "none", md: "scale(1.03)" },
              },
            }}
          />

          {/* Animated accent color bar */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 4,
              background: `linear-gradient(90deg, ${color.teal400}, ${color.emerald400}, ${color.teal500})`,
              backgroundSize: "200% 100%",
            }}
          />

          {/* Gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: {
                xs: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 90%)",
                md: "linear-gradient(225deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%)",
              },
            }}
          />

          {/* Stats indicators for mobile only */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              display: { xs: "flex", md: "none" },
              zIndex: 2,
            }}
          >
            <Chip
              icon={
                <SchoolIcon
                  sx={{ fontSize: "16px !important", color: color.white }}
                />
              }
              label={`${route.routeNodes.length}`}
              size="small"
              sx={{
                bgcolor: alpha(color.gray900, 0.6),
                backdropFilter: "blur(4px)",
                color: color.white,
                fontWeight: 600,
                border: `1px solid ${alpha(color.gray600, 0.6)}`,
                "& .MuiChip-icon": {
                  color: `${color.white} !important`,
                },
              }}
            />
          </Stack>

          {/* Date information (mobile only) */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              display: { xs: "block", md: "none" },
              color: color.white,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                textShadow: "0px 1px 3px rgba(0,0,0,0.4)",
                mb: 0.5,
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: 14 }} />
              {formatDate(route.createdAt)}
            </Typography>

            {route.updatedAt && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  textShadow: "0px 1px 3px rgba(0,0,0,0.4)",
                  opacity: 0.9,
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                Updated: {formatDate(route.updatedAt)}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Right section - Content */}
        <Box
          sx={{
            padding: { xs: 2.5, sm: 3, md: 0 },
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Content container */}
          <Box
            sx={{
              padding: { md: 4 },
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Title & Info Section */}
            <Box>
              {/* Route title */}
              <Typography
                variant={isSmall ? "h5" : "h4"}
                component="h1"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  mb: 2,
                  color: textColor,
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 4,
                    background: accentGradient,
                    borderRadius: 2,
                  },
                }}
              >
                {route.title}
              </Typography>

              {/* Info stats - inline bar (desktop only) */}
              <Box
                sx={{
                  mt: 3,
                  mb: 3,
                  display: { xs: "none", md: "block" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 2,
                    background: isDarkMode
                      ? alpha(color.gray800, 0.6)
                      : alpha(color.gray100, 0.7),
                    border: `1px solid ${
                      isDarkMode ? color.gray700 : color.gray200
                    }`,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: `0 4px 12px ${alpha(
                      color.gray900,
                      isDarkMode ? 0.3 : 0.08
                    )}`,
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "4px",
                      height: "100%",
                      background: accentGradient,
                    },
                  }}
                >
                  <Stack
                    direction={"column"}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      flexGrow: 1,
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SchoolIcon
                        sx={{
                          fontSize: 20,
                          color: isDarkMode ? color.teal300 : color.teal600,
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: textColor,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <span>{route.routeNodes.length}</span>
                        <Typography
                          component="span"
                          sx={{
                            color: secondaryTextColor,
                            fontWeight: 500,
                            fontSize: "0.85rem",
                          }}
                        >
                          Learning Items
                        </Typography>
                      </Typography>
                    </Box>

                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarTodayIcon
                        sx={{
                          fontSize: 18,
                          color: isDarkMode ? color.teal300 : color.teal600,
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 600,
                          color: textColor,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            color: secondaryTextColor,
                            fontWeight: 500,
                            fontSize: "0.85rem",
                          }}
                        >
                          Created:
                        </Typography>
                        {formatDate(route.createdAt)}
                      </Typography>
                    </Box>

                    {route.updatedAt && (
                      <>
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={{ mx: 1 }}
                        />
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <AccessTimeIcon
                            sx={{
                              fontSize: 18,
                              color: isDarkMode ? color.teal300 : color.teal600,
                            }}
                          />
                          <Typography
                            sx={{
                              fontWeight: 600,
                              color: textColor,
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                color: secondaryTextColor,
                                fontWeight: 500,
                                fontSize: "0.85rem",
                              }}
                            >
                              Updated:
                            </Typography>
                            {formatDate(route.updatedAt)}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Box>

            {/* Description section */}
            <Typography
              variant="body1"
              sx={{
                color: secondaryTextColor,
                lineHeight: 1.8,
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                letterSpacing: "0.01em",
                mt: { xs: 1, md: 0 },
                flex: 1,
              }}
            >
              {route.description}
            </Typography>

            {/* Start Learning Button */}
            <Box
              sx={{
                mt: { xs: 3, md: "auto" },
                pt: { md: 3 },
              }}
            >
              <Button
                onClick={handleStartLearning}
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                startIcon={<AutoAwesomeIcon />}
                sx={{
                  background: accentGradient,
                  borderRadius: 2,
                  px: 3,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: `0 4px 20px ${alpha(color.teal500, 0.4)}`,
                  "&:hover": {
                    boxShadow: `0 6px 25px ${alpha(color.teal500, 0.6)}`,
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Start Learning
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
