import {
  Avatar,
  Box,
  CardContent,
  Grid,
  Stack,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { formatDate, formatDateShort } from "utils/format";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { User } from "interfaces";

interface ViewModeContentProps {
  data: User | null;
}

export default function ViewModeContent({ data }: ViewModeContentProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  const textColor = isDarkMode ? color.gray200 : color.gray900;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const cardBg = isDarkMode ? color.gray800 : color.gray50;

  const InfoCard = ({
    icon,
    label,
    value,
    gradient,
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    gradient?: boolean;
  }) => (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "1.5rem",
        background: gradient
          ? `linear-gradient(135deg, ${
              isDarkMode ? color.teal900 : color.teal50
            } 0%, ${isDarkMode ? color.emerald900 : color.emerald50} 100%)`
          : cardBg,
        border: `1px solid ${isDarkMode ? color.gray700 : color.gray200}`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: isDarkMode
            ? `0 20px 40px ${color.black}30`
            : `0 20px 40px ${color.gray900}10`,
        },
        "&::before": gradient
          ? {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: isDarkMode
                ? `radial-gradient(circle at top right, ${color.teal600}10 0%, transparent 70%)`
                : `radial-gradient(circle at top right, ${color.white}50 0%, transparent 70%)`,
            }
          : {},
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ position: "relative", zIndex: 1 }}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: "1rem",
            background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}10 100%)`,
            color: accentColor,
          }}
        >
          {icon}
        </Box>
        <Box flex={1}>
          <Typography
            variant="body2"
            sx={{
              color: secondaryTextColor,
              fontWeight: 500,
              fontSize: "0.875rem",
              mb: 0.5,
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: textColor,
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <CardContent
      sx={{
        p: { xs: 3, md: 4 },
        pt: { xs: 2, md: 6 },
        position: "relative",
      }}
    >
      {/* Profile Header */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: -60, md: -80 },
          left: { xs: "50%", md: 40 },
          transform: { xs: "translateX(-50%)", md: "none" },
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-block",
          }}
        >
          <Avatar
            src={data?.avatar}
            alt={data?.name}
            sx={{
              width: { xs: 120, md: 150 },
              height: { xs: 120, md: 150 },
              border: `6px solid ${isDarkMode ? color.gray900 : color.white}`,
              boxShadow: `0 20px 60px ${
                isDarkMode ? color.black : color.gray900
              }30`,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: data?.status
                ? `linear-gradient(135deg, ${color.emerald500} 0%, ${color.green500} 100%)`
                : `linear-gradient(135deg, ${color.red500} 0%, ${color.red600} 100%)`,
              border: `3px solid ${isDarkMode ? color.gray900 : color.white}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data?.status ? (
              <CheckCircleIcon sx={{ fontSize: 12, color: color.white }} />
            ) : (
              <CancelIcon sx={{ fontSize: 12, color: color.white }} />
            )}
          </Box>
        </Box>
      </Box>

      {/* Name and Status */}
      <Box
        sx={{
          textAlign: { xs: "center", md: "left" },
          ml: { xs: 0, md: 25 },
          mt: { xs: 8, md: 4 },
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2rem", md: "2.5rem" },
            background: `linear-gradient(135deg, ${accentColor} 0%, ${
              isDarkMode ? color.emerald300 : color.emerald600
            } 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.02em",
            mb: 1,
          }}
        >
          {data?.name}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <Chip
            icon={data?.status ? <CheckCircleIcon /> : <CancelIcon />}
            label={data?.status ? "Active Account" : "Inactive Account"}
            sx={{
              background: data?.status
                ? `linear-gradient(135deg, ${color.emerald500}20 0%, ${color.green500}20 100%)`
                : `linear-gradient(135deg, ${color.red500}20 0%, ${color.red600}20 100%)`,
              color: data?.status
                ? isDarkMode
                  ? color.emerald300
                  : color.emerald700
                : isDarkMode
                ? color.red300
                : color.red700,
              border: `1px solid ${
                data?.status
                  ? isDarkMode
                    ? color.emerald700
                    : color.emerald300
                  : isDarkMode
                  ? color.red700
                  : color.red300
              }`,
              fontWeight: 600,
            }}
          />
        </Stack>
      </Box>

      {/* Info Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography
              variant="h5"
              sx={{
                color: accentColor,
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 1,
              }}
            >
              Contact Information
            </Typography>

            <InfoCard
              icon={<EmailIcon />}
              label="Email Address"
              value={data?.email || "Not provided"}
              gradient
            />

            <InfoCard
              icon={<PhoneIcon />}
              label="Phone Number"
              value={data?.phoneNumber || "Not provided"}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography
              variant="h5"
              sx={{
                color: accentColor,
                fontWeight: "bold",
                fontSize: "1.5rem",
                mb: 1,
              }}
            >
              Personal Information
            </Typography>

            <InfoCard
              icon={<CakeIcon />}
              label="Date of Birth"
              value={formatDateShort(data?.dateOfBirth)}
              gradient
            />

            <InfoCard
              icon={<CalendarTodayIcon />}
              label="Account Created"
              value={formatDate(data?.createdAt || new Date())}
            />

            <InfoCard
              icon={<UpdateIcon />}
              label="Last Updated"
              value={formatDate(data?.updatedAt || new Date())}
            />
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
  );
}
