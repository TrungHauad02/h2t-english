import { Box, Grid, Paper, Typography, Chip, Stack, Card } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Topic } from "interfaces";
import useColor from "theme/useColor";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import UpdateIcon from "@mui/icons-material/Update";

export default function TopicDetailsView({ data }: { data: Topic }) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  // Common styles
  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const textColor = isDarkMode ? color.gray100 : color.gray900;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        p: 3,
        borderRadius: "1rem",
        backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        {/* Left column - Image and stats */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: cardBgColor,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: isDarkMode
                ? "0 4px 12px rgba(0,0,0,0.3)"
                : "0 2px 8px rgba(0,0,0,0.1)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: `1px solid ${borderColor}`,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <img
                src={data.image}
                alt={data.title}
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  m: 1.5,
                }}
              >
                <Chip
                  size="small"
                  label={data.status ? "Active" : "Inactive"}
                  icon={
                    data.status ? (
                      <VerifiedIcon fontSize="small" />
                    ) : (
                      <WarningAmberIcon fontSize="small" />
                    )
                  }
                  color={data.status ? "success" : "error"}
                  sx={{
                    bgcolor: data.status
                      ? isDarkMode
                        ? `${color.emerald700}CC`
                        : `${color.emerald600}CC`
                      : isDarkMode
                      ? `${color.errorDarkMode}CC`
                      : `${color.error}CC`,
                    color: color.white,
                    fontWeight: "bold",
                    backdropFilter: "blur(4px)",
                    "& .MuiChip-icon": {
                      color: color.white,
                    },
                  }}
                />
              </Box>
            </Box>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1.5,
                  bgcolor: isDarkMode ? color.gray800 : color.teal50,
                  borderRadius: 2,
                }}
              >
                <RemoveRedEyeIcon
                  sx={{
                    mr: 1.5,
                    color: accentColor,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: secondaryTextColor,
                    fontWeight: "medium",
                  }}
                >
                  <strong>{data.views.toLocaleString()}</strong> Views
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1.5,
                  bgcolor: isDarkMode ? color.gray800 : color.teal50,
                  borderRadius: 2,
                }}
              >
                <HelpOutlineIcon
                  sx={{
                    mr: 1.5,
                    color: accentColor,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: secondaryTextColor,
                    fontWeight: "medium",
                  }}
                >
                  <strong>{data.questions.length}</strong> Questions
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1.5,
                  bgcolor: isDarkMode ? color.gray800 : color.teal50,
                  borderRadius: 2,
                }}
              >
                <CalendarTodayIcon
                  sx={{
                    mr: 1.5,
                    color: accentColor,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: secondaryTextColor,
                    fontWeight: "medium",
                  }}
                >
                  Created: {data.createdAt?.toLocaleString()}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1.5,
                  bgcolor: isDarkMode ? color.gray800 : color.teal50,
                  borderRadius: 2,
                }}
              >
                <UpdateIcon
                  sx={{
                    mr: 1.5,
                    color: accentColor,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: secondaryTextColor,
                    fontWeight: "medium",
                  }}
                >
                  Updated: {data.updatedAt?.toLocaleString()}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Right column - Content details */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Title section */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                boxShadow: isDarkMode
                  ? "0 4px 8px rgba(0,0,0,0.2)"
                  : "0 1px 3px rgba(0,0,0,0.1)",
                border: `1px solid ${borderColor}`,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                sx={{
                  color: isDarkMode ? color.teal200 : color.teal700,
                  display: "inline-block",
                }}
              >
                {data.title}
              </Typography>
            </Box>

            {/* Description section */}
            <Box
              sx={{
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                boxShadow: isDarkMode
                  ? "0 4px 8px rgba(0,0,0,0.2)"
                  : "0 1px 3px rgba(0,0,0,0.1)",
                border: `1px solid ${borderColor}`,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  pb: 1.5,
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <DescriptionIcon
                  sx={{
                    mr: 1.5,
                    color: accentColor,
                    fontSize: 28,
                  }}
                />
                <Typography variant="h6" fontWeight="medium">
                  Description
                </Typography>
              </Box>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.7,
                  color: textColor,
                  px: 1,
                }}
              >
                {data.description}
              </Typography>
            </Box>

            {/* Status section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: cardBgColor,
                p: 3,
                borderRadius: 3,
                boxShadow: isDarkMode
                  ? "0 4px 8px rgba(0,0,0,0.2)"
                  : "0 1px 3px rgba(0,0,0,0.1)",
                border: `1px solid ${borderColor}`,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  fontWeight: "medium",
                }}
              >
                <VerifiedIcon sx={{ color: accentColor }} /> Status
              </Typography>

              <Chip
                icon={data.status ? <VerifiedIcon /> : <WarningAmberIcon />}
                label={data.status ? "Active" : "Inactive"}
                color={data.status ? "success" : "error"}
                sx={{
                  bgcolor: data.status
                    ? isDarkMode
                      ? color.emerald700
                      : color.emerald600
                    : isDarkMode
                    ? color.errorDarkMode
                    : color.error,
                  color: color.white,
                  px: 1,
                  "& .MuiChip-label": {
                    fontWeight: "bold",
                  },
                  "& .MuiChip-icon": {
                    color: color.white,
                  },
                  borderRadius: 2,
                }}
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
