import {
  Box,
  Card,
  Chip,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  Theme,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import VerifiedIcon from "@mui/icons-material/Verified";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import UpdateIcon from "@mui/icons-material/Update";
import { formatDate } from "utils/format";

interface MetricItem {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

interface CommonData {
  title: string;
  image: string;
  status: boolean;
  views: number;
  createdAt?: Date;
  updatedAt?: Date;
  questions?: { length: number } | any[];
}

interface LessonImageCardProps<T extends CommonData> {
  data: T;
  hideQuestions?: boolean;
}

export default function LessonImageCard<T extends CommonData>({
  data,
  hideQuestions = false,
}: LessonImageCardProps<T>) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const cardBgColor = isDarkMode ? color.gray700 : color.white;
  const accentColor = isDarkMode ? color.teal300 : color.teal600;
  const borderColor = isDarkMode ? color.gray700 : color.gray200;
  const secondaryTextColor = isDarkMode ? color.gray300 : color.gray600;
  const metricBgColor = isDarkMode ? color.gray800 : color.teal50;
  const statusBgColor = data.status
    ? isDarkMode
      ? alpha(color.emerald700, 0.8)
      : alpha(color.emerald600, 0.8)
    : alpha(color.gray500, 0.8);

  const metrics: MetricItem[] = [
    {
      icon: <RemoveRedEyeIcon sx={{ color: accentColor }} />,
      value: data.views.toLocaleString(),
      label: "Views",
    },
    ...(!hideQuestions && data.questions
      ? [
          {
            icon: <HelpOutlineIcon sx={{ color: accentColor }} />,
            value: Array.isArray(data.questions)
              ? data.questions.length
              : data.questions.length,
            label: "Questions",
          },
        ]
      : []),
    {
      icon: <CalendarTodayIcon sx={{ color: accentColor }} />,
      value: formatDate(data.createdAt),
      label: "Created",
    },
    {
      icon: <UpdateIcon sx={{ color: accentColor }} />,
      value: formatDate(data.updatedAt),
      label: "Updated",
    },
  ];

  return (
    <Card
      elevation={isDarkMode ? 4 : 2}
      sx={{
        bgcolor: cardBgColor,
        borderRadius: { xs: 2, sm: 3 },
        overflow: "hidden",
        boxShadow: isDarkMode
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : "0 2px 12px rgba(0,0,0,0.1)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: `1px solid ${borderColor}`,
        "&:hover": {
          boxShadow: isDarkMode
            ? "0 12px 28px rgba(0,0,0,0.5)"
            : "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            width: "100%",
            aspectRatio: "16/9",
            height: { xs: 180, sm: 200, md: 220 },
            backgroundColor: isDarkMode ? color.gray800 : color.gray200,
            overflow: "hidden",
          }}
        >
          <img
            src={data.image}
            alt={data.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, ${
                isDarkMode ? alpha(color.gray900, 0.7) : "transparent"
              } 0%, transparent 60%)`,
              opacity: 0.8,
            }}
          />
        </Box>

        {/* Status Badge */}
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
            sx={{
              bgcolor: statusBgColor,
              color: color.white,
              fontWeight: "bold",
              backdropFilter: "blur(4px)",
              px: 0.5,
              "& .MuiChip-icon": {
                color: color.white,
              },
            }}
          />
        </Box>
      </Box>

      {/* Content Section */}
      <Stack
        spacing={2}
        sx={{
          p: { xs: 2, sm: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Metrics */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 2,
          }}
        >
          {metrics.map((metric, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                bgcolor: metricBgColor,
                borderRadius: 2,
                transition: "transform 0.15s ease, background-color 0.15s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  bgcolor: isDarkMode
                    ? alpha(color.teal900, 0.5)
                    : alpha(color.teal100, 0.8),
                },
              }}
            >
              <Box sx={{ mr: 1.5 }}>{metric.icon}</Box>
              <Typography
                variant="body2"
                sx={{
                  color: secondaryTextColor,
                  fontWeight: "medium",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component="span"
                  variant="subtitle2"
                  sx={{
                    fontWeight: "bold",
                    color: isDarkMode ? color.teal200 : color.teal700,
                  }}
                >
                  {metric.value}
                </Typography>
                {metric.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Card>
  );
}
